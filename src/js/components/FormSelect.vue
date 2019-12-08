<template>
    <select ref="select"
            class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            @change="select"
    >
        <option v-for="(name, key) in options"
                :value="key" :selected="isSelected(key)">{{ name }}</option>
    </select>
</template>

<script>
export default {
    data() {
        return {
            options: Object,
            selected: null,
        }
    },

    methods: {
        select() {
            this.$emit('input', this.$refs.select.value);
        },

        isSelected(key) {
            return key === this.$attrs.value;
        }
    }
}
</script>