<template>
    <div>
        <div class="flex justify-between">
            <form-label text="File info"></form-label>
            <a href="#"
               class="text-sm text-indigo-500 hover:text-indigo-700"
               @click="example"
               v-if="!format.filename"
            >Load example</a>
        </div>

        <form-textarea v-model="input" v-if="!format.filename"></form-textarea>

        <p v-else>
            File <strong>{{ format.filename }}</strong> with <strong>{{ streams.length }}</strong> streams.
            <a href="#"
               class="text-indigo-500 hover:text-indigo-700"
               @click="reset"
            >Reset</a>
        </p>
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