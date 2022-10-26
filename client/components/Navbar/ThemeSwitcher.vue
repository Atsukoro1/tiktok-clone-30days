<template>
    <button 
        type="button" 
        class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
        @click.prevent="toggleTheme"
    >
        <span class="sr-only">Change theme</span>
        <fa-icon
            :icon="$colorMode.value === 'dark' ? ['fas', 'moon'] : ['fas', 'sun']"
            :class="`text-2xl text-gray-400 dark:text-white`"
        />
    </button>
</template>

<script>
    export default {
        name: "ThemeSwitcher",
        methods: {
            toggleTheme() {
                this.$colorMode.preference = this.$colorMode.preference === 'light' ? 'dark' : 'light'
            }
        }
    }
</script>