<template>
    <div class="flex flex-wrap sm:flex-no-wrap justify-between p-2 border mb-4 bg-white rounded shadow">
        <div class="w-1/2 mr-4">
            <h3 class="mb-2 font-bold uppercase">Metadata</h3>

            <form-label text="Language"></form-label>
            <form-lang v-model="options.lang" class="w-full"></form-lang>

            <h3 class="mt-2 mb-2 font-bold uppercase">Filter</h3>

            <form-label class="mt-2" text="Scale"></form-label>
            <form-input v-model="options.filter.scale" placeholder="1920:1080 (fixed) or 1920:-1 (to preserve ratio)"></form-input>

            <form-label class="mt-2" text="Scale"></form-label>
            <form-input v-model="options.filter.crop" placeholder="width:height:position_x:position_y"></form-input>
        </div>

        <div class="w-1/2">
            <h3 class="mb-2 font-bold uppercase">Codec</h3>

            <form-label text="Convert"></form-label>
            <form-codec :type="stream.codec_type" v-model="options.codec" class="w-full"></form-codec>

            <form-label class="mt-2" text="Preset"></form-label>
            <form-preset v-model="options.video.preset" placeholder="Defaults to medium" class="w-full"></form-preset>

            <form-label class="mt-2" text="Profile"></form-label>
            <form-profile v-model="options.video.profile" placeholder="Defaults to main" class="w-full"></form-profile>

            <form-label class="mt-2" text="CRF"></form-label>
            <form-number v-model="options.video.crf" placeholder="0 is the better, 64 is the worst, 23~28 is fine" class="w-full" min="0" max="64" step="1"></form-number>
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
                video: {
                    preset: null,
                    profile: null,
                    crf: null,
                },
                filter: {
                    scale: null,
                    crop: null,
                },
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