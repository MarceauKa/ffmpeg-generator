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
                    {{ stream.channel_layout }} ({{ stream.tags ? stream.tags.language : 'und' }})
                </span>
                <span v-else-if="stream.codec_type === 'subtitle'">
                    {{ stream.codec_name }}<br>
                    {{ stream.tags ? stream.tags.language : 'und' }}
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

        <div v-show="showMore">
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

    methods: {
        disable() {
            this.disabled = !this.disabled;
            this.showMore = false;
            this.command();
        },

        updated(stream) {
            this.stream = stream;
            this.command();
        },

        command() {
            if (this.disabled) {
                this.$emit('updated', {
                    stream: this.stream,
                    command: '',
                });

                return '';
            }

            let command = '';
            let options = this.stream.options;
            let index = this.stream.index;
            let codec = options.codec;
            let encoder = codec ? DATA.ENCODERS[codec] || codec : 'copy';
            let type = this.stream.codec_type === 'video' ? 'v' : this.stream.codec_type === 'audio' ? 'a' : 's';
            let parts = [
                `-map 0:${index} -c:${type}:${index} ${encoder}`
            ];


            parts = this.filterParts(options, parts);
            parts = this.videoParts(options, parts);
            parts = this.audioParts(options, parts);

            if (options.lang && options.lang !== 'und' && options.nometa === false) {
                let lang = options.lang;
                let title = DATA.LANGS[lang];

                parts.push(`-metatada:${type}:${index} language=${lang} title="${title}"`);
            }

            command = parts.join(' ');

            this.$emit('updated', {
                stream: this.stream,
                command: command,
            });

            return command;
        },

        filterParts(options, parts) {
            if (options.filter) {
                let filter_parts = [];

                if (options.filter.crop) {
                    filter_parts.push(`crop=${options.filter.crop}`);
                }

                if (options.filter.scale) {
                    filter_parts.push(`scale=${options.filter.scale}`);
                }

                if (filter_parts.length > 0) {
                    parts.push(`-vf "${filter_parts.join(',')}"`);
                }
            }

            return parts;
        },

        videoParts(options, parts) {
            if (options.hasOwnProperty('video')) {
                let video_parts = [];

                if (options.video.crf) {
                    video_parts.push(`-crf ${options.video.crf}`);
                }

                if (options.video.profile) {
                    video_parts.push(`-profile:v ${options.video.profile}`);
                }

                if (options.video.preset) {
                    video_parts.push(`-preset ${options.video.preset}`);
                }

                if (video_parts.length > 0) {
                    parts.push(video_parts.join(' '));
                }
            }

            return parts;
        },

        audioParts(options, parts) {
            if (options.hasOwnProperty('audio')) {
                let audio_parts = [];

                if (options.audio.rates) {
                    audio_parts.push(`-ar ${options.audio.rates}`);
                }

                if (options.audio.bitrates) {
                    audio_parts.push(`-b:a ${options.audio.bitrates}`);
                }

                if (options.audio.channels) {
                    audio_parts.push(`-ac ${options.audio.channels}`);
                }

                if (options.audio.vbr) {
                    audio_parts.push(`-q:a ${options.audio.vbr}`);
                }

                if (audio_parts.length > 0) {
                    parts.push(audio_parts.join(' '));
                }
            }

            return parts;
        },
    },
}
</script>