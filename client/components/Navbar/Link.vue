<template>
    <a :href="link" :class="`
        dark:text-[#58606C] text-black dark:text-gray-200 dark:hover:bg-gray-700 
        hover:bg-slate-400 px-3 py-2 rounded-md text-sm font-medium`"
    >
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