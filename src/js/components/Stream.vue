<template>
    <div class="flex flex-wrap sm:flex-no-wrap justify-between items-center align-middle p-2 border mb-2 bg-white rounded shadow"
         :class="{'opacity-50': disabled}">
        <a class="block w-full sm:w-auto text-center bg-gray-200 rounded px-3 py-2 text-sm font-semibold text-gray-700 mr-0 mb-1 sm:mr-2 sm:mb-0 handle-order cursor-move select-none">
           ↕︎ {{ stream.codec_type.toUpperCase() }} #{{ stream.index }}
        </a>

        <div class="flex flex-wrap sm:flex-no-wrap justify-start mr-0 mb-2 sm:mr-2 sm:mb-0">
            <form-codec :stream="stream" v-model="codec" class="w-full sm:w-2/4 mb-1 sm:mb-0 mr-0 sm:mr-2"></form-codec>
            <form-lang v-model="lang" class="w-full sm:w-2/4"></form-lang>
        </div>

        <div class="ml-auto sm:ml-none">
            <button class="text-sm text-teal-500" @click="disable" v-if="!disabled">Included</button>
            <button class="text-sm text-indigo-500" @click="disable" v-else>Excluded</button>
        </div>
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
            lang: null,
            disabled: false,
        }
    },

    mounted() {
        this.lang = this.stream.tags.language;
    },

    methods: {
        disable() {
            this.disabled = !this.disabled;
        }
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
        command: function () {
            if (this.disabled) {
                return '';
            }

            let index = this.stream.index;
            let codec = this.codec ? DATA.ENCODERS[this.codec] || this.codec : 'copy';

            let parts = [
                `-map 0:${index} -c:0:${index} ${codec}`
            ];

            if (this.lang && this.lang !== 'und') {
                let title = DATA.LANGS[this.lang];
                parts.push(`-metatada:0:${index} language=${this.lang} title="${title}"`);
            }

            return parts.join(' ');
        },
    }
}
</script>