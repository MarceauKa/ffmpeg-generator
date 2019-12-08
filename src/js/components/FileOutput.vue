<template>
    <div v-if="filename">
        <form-label text="File output"></form-label>
        <form-input v-model="filename"></form-input>
    </div>
</template>

<script>

export default {
    data() {
        return {
            filename: '',
        }
    },

    mounted() {
        this.$bus.on('file.input', (input) => {
            this.filename = `[ffmpeg] ${input.format.filename}`;
        });
    },

    watch: {
        filename: function (value) {
            this.$bus.emit('output.filename', {
                name: value,
            })
        }
    }
}
</script>