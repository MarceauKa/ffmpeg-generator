<script>
import DATA from '../data';
import FormSelect from "./FormSelect";

export default {
    extends: FormSelect,

    props: {
        type: String,
    },

    mounted() {
        let options;

        switch (this.type) {
            case 'video':
                options = DATA.CODECS_VIDEO;
                break;
            case 'audio':
                options = DATA.CODECS_AUDIO;
                break;
            case 'subtitle':
                options = DATA.CODECS_SUBTITLE;
                break;

        }

        options.copy = '-- Copy --';
        this.options = options;
    }
}
</script>