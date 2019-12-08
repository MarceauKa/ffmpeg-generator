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

        <form-input placeholder="Output file name" v-model="filename"></form-input>

        <div class="flex flex-wrap sm:flex-no-wrap justify-start mt-2">
            <form-checkbox class="mr-0 sm:mr-2" v-model="chapters">Remove chapters</form-checkbox>

            <form-checkbox v-model="metadata">Remove initial metadata</form-checkbox>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            filename: '',
            chapters: false,
            metadata: false,
        }
    },

    mounted() {
        this.$bus.on('file.input', (input) => {
            let file = input.format.filename;
            this.updateFilename(file);
        });

        this.$bus.on('file.reset', () => {
            this.filename = '';
        });
    },

    methods: {
        updateFilename(file) {
            let match = file.match(/(.*)\.(.*)/);

            if (match) {
                this.filename = `${match[1]}.${match[2]}`;
            }

            this.updated();
        },

        setExtension(ext) {
            let file = this.filename;
            let match = file.match(/(.*)\.(.*)/);

            if (match) {
                let file = `${match[1]}.${ext}`;
                this.updateFilename(file);
            }
        },

        updated() {
            this.$bus.emit('file.output', {
                name: this.filename,
                chapters: this.chapters,
                metadata: this.metadata,
            })
        }
    },

    watch: {
        filename(value) {
            this.updateFilename(value);
        },

        chapters() {
            this.updated();
        },

        metadata() {
            this.updated();
        },
    }
}
</script>