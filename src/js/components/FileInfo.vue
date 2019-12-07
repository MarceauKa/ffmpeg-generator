<template>
    <div>
        <form-label text="File info"></form-label>
        <form-textarea v-model="input"></form-textarea>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: '',
            streams: [],
            format: {},
        }
    },

    mounted() {
    },

    methods: {
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
            } catch (e) {
                alert('Invalid input format: Input must be JSON');
            }
        }
    }
}
</script>