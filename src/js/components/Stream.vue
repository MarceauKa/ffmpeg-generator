<template>
    <div class="flex items-center align-middle p-2 border mb-2 rounded shadow">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #{{ stream.index }}
        </span>

        <span class="mr-2">{{ stream.codec_type.toUpperCase() }}</span>

        <form-codec :stream="stream" v-model="codec" class="mr-2"></form-codec>
        <form-lang v-model="lang" class="mr-2"></form-lang>
    </div>
</template>

<script>
import DATA from '../data';

export default {
    props: {
        stream: Object,
    },

    data() {
        return {
            codec: 'copy',
            lang: 'und',
        }
    },

    mounted() {
        this.lang = this.stream.tags.language || 'und';
    },

    watch: {
        command: function (value) {
            this.$emit('update', {
                stream: this.stream,
                command: value,
            });
        }
    },

    computed: {
        command() {
            let index = this.stream.index;
            let codec = this.codec ? DATA.ENCODERS[this.codec] || this.codec : 'copy';

            return `-map 0:${index} -c:0:${index} ${codec} -metatada:0:${index} language=${this.lang} title=""`;
        },
    }
}
</script>