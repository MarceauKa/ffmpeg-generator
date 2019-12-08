<template>
    <div>
        <form-label text="File info"></form-label>
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

    mounted() {
        this.input = DATA.EXAMPLE;
    },

    methods: {
        reset() {
            this.input = '';
            this.streams = [];
            this.format = {};

            this.$bus.$emit('file.reset');
        }
    },

    watch: {
        input: function (value) {
            if (! value) {
                return;
            }

            try {
                let data = JSON.parse(value);
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