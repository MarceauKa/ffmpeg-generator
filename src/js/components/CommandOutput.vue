<template>
    <div v-if="format.filename">
        <form-label text="Command"></form-label>

        <p class="block border rounded shadow py-2 px-3 text-red-500 break-all font-mono">{{ command }}</p>
    </div>
</template>

<script>
export default {
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
            this.updateCommand();
        });

        this.$bus.on('file.reset', () => {
            this.format = {};
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