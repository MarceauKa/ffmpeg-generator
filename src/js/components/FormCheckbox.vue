<template>
    <label class="block text-gray-700 text-sm font-bold mb-2">
        <input type="checkbox" ref="checkbox" :value="$attrs.value === true" @change="change($event)" />
        <slot></slot>
    </label>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            required: false,
            default: false,
        }
    },

    methods: {
        change($event) {
            this.$emit('input', !this.value);
        }
    }
}
</script>