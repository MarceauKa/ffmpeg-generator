<template>
    <div :class="{'opacity-50': disabled}">
        <div class="flex flex-wrap sm:flex-no-wrap justify-between items-center align-middle p-2 border mb-2 bg-white rounded shadow">
            <a class="block w-full sm:w-auto text-center bg-gray-200 rounded px-3 py-2 text-sm font-semibold text-gray-700 mr-0 mb-1 sm:mr-2 sm:mb-0 handle-order cursor-move select-none">
                ↕︎ {{ stream.codec_type.toUpperCase() }} #{{ stream.index }}
            </a>

            <div class="mr-0 mb-2 sm:mr-2 sm:mb-0 leading-tight text-sm font-mono text-center px-2">
                <span v-if="stream.codec_type === 'video'">
                    {{ stream.codec_name }} @ {{ stream.bit_rate / 1000 }} kbp/s<br>
                    {{ stream.width }} x {{ stream.height }}
                </span>
                <span v-else-if="stream.codec_type === 'audio'">
                    {{ stream.codec_name }} @ {{ stream.bit_rate / 1000 }} kbp/s<br>
                    {{ stream.channel_layout }} ({{ stream.tags.language }})
                </span>
                <span v-else-if="stream.codec_type === 'subtitle'">
                    {{ stream.codec_name }}<br>
                    {{ stream.tags.language }}
                </span>
            </div>

            <div>
                <button type="button"
                        class="text-sm mr-1 border py-2 px-3 border-gray-300 bg-gray-200 rounded shadow"
                        @click="showMore = !showMore">
                    {{ showMore ? 'Done' : 'Configure' }}
                </button>

                <button type="button"
                        class="text-sm border py-2 px-3 text-black rounded shadow"
                        :class="{'border-teal-300 bg-teal-200': !disabled, 'border-indigo-300 bg-indigo-200': disabled}"
                        @click="disable"
                >
                    {{ disabled ? 'Excluded' : 'Included' }}
                </button>
            </div>
        </div>

        <div v-if="showMore">
            <configure-video :stream="stream" @updated="updated" v-if="stream.codec_type === 'video'"></configure-video>
            <configure-audio :stream="stream" @updated="updated" v-if="stream.codec_type === 'audio'"></configure-audio>
            <configure-subtitle :stream="stream" @updated="updated" v-if="stream.codec_type === 'subtitle'"></configure-subtitle>
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
            disabled: false,
            showMore: false,
        }
    },

    mounted() {
        this.lang = this.stream.tags.language;
    },

    methods: {
        disable() {
            this.disabled = !this.disabled;
            this.showMore = false;
        },

        updated($event) {
            console.log($event);
        }
    },

    watch: {
        command: function (value) {
            this.$emit('update', {
                stream: this.stream,
                command: value,
            });
        },
    },

    computed: {
        command() {
            if (this.disabled) {
                return '';
            }

            let index = this.stream.index;
            let codec = this.stream.codec ? DATA.ENCODERS[this.stream.codec] || this.stream.codec : 'copy';

            let parts = [
                `-map 0:${index} -c:0:${index} ${codec}`
            ];

            if (this.stream.lang && this.stream.lang !== 'und') {
                let lang = this.stream.lang;
                let title = DATA.LANGS[lang];
                parts.push(`-metatada:0:${index} language=${lang} title="${title}"`);
            }

            return parts.join(' ');
        },

        showCodec() {
            return this.stream.codec_type === 'video'
                || this.stream.codec_type === 'audio';
        }
    }
}
</script>