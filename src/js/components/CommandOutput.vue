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
            parts: {},
            command: '',
        }
    },

    mounted() {
        this.$bus.on('file.input', (input) => {
            this.format = input.format;
            this.parts = {};
            this.command = '';
            this.updateCommand();
        });

        this.$bus.on('file.reset', () => {
            this.format = {};
            this.parts = {};
            this.command = '';
            this.updateCommand();
        });

        this.$bus.on('streams', (streams) => {
            this.parts = streams.command;
            this.updateCommand();
        });

        this.$bus.on('output.filename', (payload) => {
            this.filename = payload.name;
            this.updateCommand();
        });
    },

    methods: {
        updateCommand() {
            let input = this.format.filename;
            let output = this.filename;
            let parts = Object.values(this.parts).join(' ');

            this.command = `ffmpeg -i "${input}" ${parts} "${output}"`.trim();
        }
    }
}
</script>