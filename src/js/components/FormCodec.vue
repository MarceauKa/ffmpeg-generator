<script>
import DATA from '../data';
import FormSelect from "./FormSelect";

export default {
    extends: FormSelect,

    props: {
        stream: Object,
    },

    mounted() {
        let options;

        if (this.stream.codec_type === 'video') {
            options = DATA.CODECS_VIDEO;
        }

        if (this.stream.codec_type === 'audio') {
            options = DATA.CODECS_AUDIO;
        }

        if (this.stream.codec_type === 'subtitle') {
            options = DATA.CODECS_SUBTITLE;
        }

        options.copy = '-- Copy --';
        this.options = options;
    }
}
</script>