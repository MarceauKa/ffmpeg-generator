<template>
    <div v-if="filename">
        <div class="flex justify-between">
            <form-label text="File output"></form-label>
            <div>
                <a href="#"
                   class="text-sm text-indigo-500 hover:text-indigo-700"
                   @click.prevent="setExtension('mkv')"
                >MKV</a> -
                <a href="#"
                   class="text-sm text-indigo-500 hover:text-indigo-700"
                   @click.prevent="setExtension('mp4')"
                >MP4</a> -
                <a href="#"
                   class="text-sm text-indigo-500 hover:text-indigo-700"
                   @click.prevent="setExtension('avi')"
                >AVI</a>
            </div>
        </div>

        <form-input v-model="filename"></form-input>
    </div>
</template>

<script>

export default {
    data() {
        return {
            filename: '',
        }
    },

    mounted() {
        this.$bus.on('file.input', (input) => {
            let file = input.format.filename;
            this.updateFilename(file);
        });

        this.$bus.on('file.reset', () => {
            this.filename = '';
            this.extension = '';
        });
    },

    methods: {
        updateFilename(file) {
            let match = file.match(/(.*)\.(.*)/);

            if (match) {
                this.filename = `${match[1]}.${match[2]}`;
            }

            this.$bus.emit('output.filename', {
                name: this.filename,
            })
        },

        setExtension(ext) {
            let file = this.filename;
            let match = file.match(/(.*)\.(.*)/);

            if (match) {
                let file = `${match[1]}.${ext}`;
                this.updateFilename(file);
            }
        }
    },

    watch: {
        filename(value) {
            this.updateFilename(value);
        }
    }
}
</script>