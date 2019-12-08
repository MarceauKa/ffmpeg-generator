<template>
    <div v-if="format.filename">
        <form-label text="Streams"></form-label>

        <stream v-for="stream in streams"
                :key="stream.index"
                :stream="stream"
                @update="updated"
        ></stream>
    </div>
</template>

<script>
export default {
    data() {
        return {
            streams: [],
            format: {},
            maps: {},
        };
    },

    mounted() {
        this.$bus.on('file.input', (input) => {
            this.format = input.format;
            this.streams = input.streams;
            this.maps = {};
        });

        this.$bus.on('file.reset', () => {
            this.format = {};
            this.streams = [];
            this.maps = {};
        });

        this.$bus.on('stream.command', (payload) => {
            this.maps[payload.stream.index] = payload.command;
        })
    },

    methods: {
        updated(payload) {
            this.maps[payload.stream.index] = payload.command;

            this.$bus.emit('streams', {
                command: this.maps,
            })
        }
    }
}
</script>