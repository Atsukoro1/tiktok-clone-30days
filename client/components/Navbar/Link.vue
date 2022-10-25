<template>
    <a :href="link" class="text-black hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium">
        {{ text }}
    </a>
</template>

<script>
    export default {
        name: "RegisterModal",
        props: {
            text: {
                type: String,
                default: "Button"
            },
            highlighted: {
                type: Boolean,
                default: false
            },
            link: {
                type: String,
                default: "#"
            }
        },
    }
</script>