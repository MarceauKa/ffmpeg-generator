<template>
    <div>
        <alert class="mb-4" color="teal" v-if="!input">
            <template #title>
                Use ffprobe
            </template>
            <template #message>
                <p class="font-mono">ffprobe -loglevel quiet -show_format -show_streams -print_format json video_file.mkv</p>
            </template>
        </alert>

        <div class="flex justify-between">
            <form-label text="File info"></form-label>
            <a href="#"
               class="text-sm text-indigo-500 hover:text-indigo-700"
               @click="example"
               v-if="!format.filename"
            >Load example</a>
            <a href="#"
               class="text-sm text-indigo-500 hover:text-indigo-700"
               v-else
               @click="reset"
            >Reset</a>
        </div>

        <form-textarea v-model="input" placeholder="Paste your ffprobe result" v-if="!format.filename"></form-textarea>

        <alert color="blue" v-else>
            <template #title>{{ format.filename }}</template>
            <template #message>
                Detected <strong>{{ streams.length }}</strong> streams with a duration of <strong>{{ duration }}</strong> seconds.
            </template>
        </alert>
    </div>
</template>

<script>
import DATA from '../data';

export default {
    data() {
        return {
            input: '',
            streams: [],
            format: {},
        }
    },

    methods: {
        reset() {
            this.input = '';
            this.streams = [];
            this.format = {};

            this.$bus.$emit('file.reset');
        },

        example() {
            this.input = DATA.EXAMPLE;
        }
    },

    computed: {
        duration() {
            if (this.format.duration) {
                return Number(this.format.duration);
            }

            return null;
        }
    },

    watch: {
        input: function (value) {
            if (! value) {
                return;
            }

            try {
                let data = value === Object(value) ? value : JSON.parse(value);
                this.streams = data.streams;
                this.format = data.format;

                this.$bus.$emit('file.input', {
                    streams: this.streams,
                    format: this.format
                });
            } catch (e) {
                alert('Invalid input format: Input must be JSON');
            }
        }
    }
}
</script>