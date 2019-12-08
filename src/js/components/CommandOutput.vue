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
            parts: [],
            command: '',
        }
    },

    mounted() {
        this.$bus.on('file.input', (input) => {
            this.format = input.format;
            this.streams = [];
            this.parts = [];
            this.command = '';

            this.updateCommand();
        });

        this.$bus.on('file.reset', () => {
            this.format = {};
            this.streams = [];
            this.parts = [];
            this.command = '';

            this.updateCommand();
        });

        this.$bus.on('streams', (payload) => {
            this.streams = payload.streams;

            this.updateCommand();
        });

        this.$bus.on('file.output', (payload) => {
            this.filename = payload.name;

            this.manageChapters(payload.chapters);
            this.manageMetadata(payload.metadata);

            this.updateCommand();
        });
    },

    methods: {
        updateCommand() {
            let input = this.format.filename;
            let output = this.filename;
            let maps = this.streams.map(item => item.command).join(' ');
            let parts = Object.values(this.parts).join(' ');
            
            this.command = `ffmpeg -i "${input}" ${maps} ${parts} "${output}"`.trim();
        },

        manageChapters(state) {
            let chapters_commands = '-map_chapters -1';
            let chapters_index = this.parts.indexOf(chapters_commands);

            if (state === true && chapters_index === -1) {
                this.parts.push(chapters_commands);
            }

            if (state === false && chapters_index !== -1) {
                this.parts.splice(chapters_index, 1);
            }
        },

        manageMetadata(state) {
            let meta_commands = '-map_metadata -1';
            let meta_index = this.parts.indexOf(meta_commands);

            if (state === true && meta_index === -1) {
                this.parts.push(meta_commands);
            }

            if (state === false && meta_index !== -1) {
                this.parts.splice(meta_index, 1);
            }
        }
    }
}
</script>