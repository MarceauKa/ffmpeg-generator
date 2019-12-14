<template>
    <div v-if="filename">
        <div class="flex flex-wrap sm:flex-no-wrap justify-start mt-2">
            <div class="w-full mr-2">
                <div class="w-full flex justify-between">
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
            </div>

            <div class="w-full mr-2">
                <div class="w-full flex justify-between">
                    <form-label text="Start at (seconds)"></form-label>
                    <div>
                        <a href="#"
                           class="text-sm text-indigo-500 hover:text-indigo-700"
                           @click.prevent="start = null"
                           v-if="start !== null && start >= 0"
                        >Clear</a>
                    </div>
                </div>
                <form-time v-model="start" min="0" :max="Number(format.duration)"></form-time>
            </div>

            <div class="w-full">
                <div class="w-full flex justify-between">
                    <form-label text="End at (seconds)"></form-label>
                    <div>
                        <a href="#"
                           class="text-sm text-indigo-500 hover:text-indigo-700"
                           @click.prevent="end = null"
                           v-if="end !== null && end >= 0"
                        >Clear</a>
                    </div>
                </div>
                <form-time v-model="end" min="0" :max="Number(format.duration)"></form-time>
            </div>
        </div>

        <div class="flex flex-wrap sm:flex-no-wrap justify-start mt-2">
            <form-checkbox class="mr-0 sm:mr-2" v-model="chapters">Remove chapters</form-checkbox>

            <form-checkbox class="mr-0 sm:mr-2" v-model="metadata">Remove initial metadata</form-checkbox>

            <form-checkbox v-model="faststart">Enable faststart</form-checkbox>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            format: {},
            filename: '',
            chapters: false,
            metadata: false,
            faststart: false,
            start: null,
            end: null,
        }
    },

    mounted() {
        this.$bus.on('file.input', (input) => {
            this.format = input.format;
            this.updateFilename(input.format.filename);
        });

        this.$bus.on('file.reset', () => {
            this.filename = '';
            this.format = {};
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
            let parts = [];
            let command = '';

            if (this.chapters === true) {
                parts.push('-map_chapters -1');
            }

            if (this.metadata === true) {
                parts.push('-map_metadata -1');
            }

            if (this.start !== null && this.start >= 0) {
                parts.push(`-ss ${this.start}`);
            }

            if (this.end !== null && this.end >= 0) {
                parts.push(`-to ${this.end}`);
            }

            if (this.faststart === true) {
                parts.push('-movflags +faststart');
            }

            parts = parts.join(' ');
            command = `${parts} "${this.filename}"`;

            this.$bus.emit('file.output', {
                command: command.trim(),
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

        faststart() {
            this.updated();
        },

        start(value) {
            this.updated();
        },

        end(value) {
            this.updated();
        }
    }
}
</script>