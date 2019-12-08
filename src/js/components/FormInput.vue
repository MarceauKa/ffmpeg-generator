<template>
    <input ref="input"
           class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y"
           :value="value"
           :placeholder="placeholder"
           @input="input" />
</template>

<script>
export default {
    props: {
        value: String,
        placeholder: String,
    },

    methods: {
        input() {
            this.$emit('input', this.$refs.input.value)
        }
    }
}
</script>