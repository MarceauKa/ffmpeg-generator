<template>
    <div class="flex flex-wrap sm:flex-no-wrap justify-between p-2 border mb-4 bg-white rounded shadow">
        <div class="w-1/2 mr-4">
            <h3 class="mb-2 font-bold uppercase">Metadata</h3>

            <form-label text="Language"></form-label>
            <form-lang v-model="options.lang" class="w-full"></form-lang>

            <form-checkbox class="mt-2" v-model="options.nometa">No meta</form-checkbox>
        </div>

        <div class="w-1/2">
            <h3 class="mb-2 font-bold uppercase">Codec</h3>

            <form-label text="Convert"></form-label>
            <form-codec :type="stream.codec_type" v-model="options.codec" class="w-full"></form-codec>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            stream: Object,
        },

        mounted() {
            this.options.codec = this.stream.options.codec || null;
            this.options.lang = this.stream.options.lang || null;
        },

        data() {
            return {
                options: {
                    codec: null,
                    lang: null,
                }
            }
        },

        watch: {
            options: {
                handler(value) {
                    let stream = this.stream;
                    stream.options = this.options;

                    this.$emit('updated', stream);
                },
                deep: true
            }
        }
    }
</script>