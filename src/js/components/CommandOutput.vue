<template>
    <div v-if="format.filename">
        <div class="flex justify-between">
            <form-label text="Command"></form-label>

            <a href="#"
               class="text-sm text-indigo-500 hover:text-indigo-700"
               @click.prevent="copyToClipboard($event, command)"
            >Copy</a>
        </div>

        <p class="block border rounded shadow py-2 px-3 text-red-500 break-all font-mono bg-white">{{ command }}</p>
    </div>
</template>

<script>
import copyToClipboard from '../mixins/copyToClipboard';

export default {
    mixins: [
        copyToClipboard
    ],

    data() {
        return {
            filename: '',
            format: {},
            streams: [],
            output: '',
            parts: [],
            command: '',
        }
    },

    mounted() {
        this.$bus.on('file.input', (input) => {
            this.format = input.format;
            this.streams = [];
            this.parts = [];
            this.output = '';
            this.command = '';
            this.updateCommand();
        });

        this.$bus.on('file.reset', () => {
            this.format = {};
            this.streams = [];
            this.parts = [];
            this.output = '';
            this.command = '';
            this.updateCommand();
        });

        this.$bus.on('streams', (payload) => {
            this.streams = payload.streams;
            this.updateCommand();
        });

        this.$bus.on('file.output', (payload) => {
            this.output = payload.command;
            this.updateCommand();
        });
    },

    methods: {
        updateCommand() {
            let input = this.format.filename;
            let output = this.output;
            let maps = this.streams.map(item => item.command).join(' ');
            let parts = this.parts.length > 0 ? Object.values(this.parts).join(' ') : '';
            
            this.command = `ffmpeg -i "${input}" ${maps} ${parts} ${output}`.trim();
        },
    }
}
</script>