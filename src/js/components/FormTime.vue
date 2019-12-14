<template>
    <input ref="input"
           type="number"
           class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           :value="value"
           step="1"
           :min="min"
           :max="max"
           @input="input" />
</template>

<script>
export default {
    props: {
        value: Number|String,
        min: null,
        max: null
    },

    methods: {
        input() {
            this.$emit('input', Number(this.$refs.input.value))
        }
    }
}
</script>