<template>
    <div :class="`bg-${color}-100 border-t-4 border-${color}-500 rounded-b text-${color}-900 p-4 shadow`" role="alert">
        <p class="font-bold">
            <slot name="title"></slot>
        </p>
        <p class="text-sm">
            <slot name="message"></slot>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        color: String,
    },
}
</script>