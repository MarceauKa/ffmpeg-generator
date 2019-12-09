<template>
    <div class="flex flex-wrap sm:flex-no-wrap justify-between p-2 border mb-4 bg-white rounded shadow">
        <div class="w-1/2 mr-2">
            <h3>Metadata</h3>

            <form-label text="Language"></form-label>
            <form-lang v-model="stream.lang" class="w-full"></form-lang>
        </div>

        <div class="w-1/2">
            <h3>Codec</h3>

            <form-label text="Convert"></form-label>
            <form-codec :stream="stream" v-model="stream.codec" class="w-full"></form-codec>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        stream: Object,
    },

    data() {
        return {
        }
    },

}
</script>