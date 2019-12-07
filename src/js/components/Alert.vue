<template>
    <div :class="`bg-${color}-100 border-t-4 border-${color}-500 rounded-b text-${color}-900 p-4 shadow`" role="alert">
        <p class="font-bold" v-html="title"></p>
        <p class="text-sm" v-html="message"></p>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        message: String,
        color: String,
    },
}
</script>