<template>
    <div v-if="format.filename">
        <form-label text="Streams"></form-label>

        <draggable v-model="streams"
                   group="streams"
                   v-bind="dragOptions"
                   @start="drag = true"
                   @end="drag = false"
                   handle=".handle-order"
        >
            <transition-group
                    type="transition"
                    tag="div"
                    :name="!drag ? 'flip-list' : null"
            >
                <stream v-for="stream in streams"
                        :key="stream.index"
                        :stream="stream"
                        @update="updated"
                ></stream>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
export default {
    data() {
        return {
            streams: [],
            format: {},
            drag: false,
            dragOptions: {
                animation: 200,
                group: "streams",
                disabled: false,
                ghostClass: "ghost",
                forceFallback: true
            },
        };
    },

    mounted() {
        this.$bus.on('file.input', (input) => {
            this.format = input.format;
            this.streams = input.streams;
        });

        this.$bus.on('file.reset', () => {
            this.format = {};
            this.streams = [];
        });
    },

    methods: {
        updated(payload) {
            let index = this.streams.indexOf(payload.stream);
            this.streams[index].command = payload.command;

            this.updateMaps();
        },

        updateMaps() {
            let maps = [];

            this.streams.forEach((item) => {
                maps.push(item.command);
            });

            this.$bus.emit('streams', {
                command: maps,
            })
        },
    },

    watch: {
        streams: function (value) {
            this.updateMaps();
        }
    }
}
</script>