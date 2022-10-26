<template>
    <div class="sm:block hidden hover:opacity-70 bg-slate-200 dark:bg-gray-700 pt-2 pb-2 pr-4 pl-4 rounded-lg">
        <fa-icon class="dark:text-white text-gray-500" :icon="['fas', 'magnifying-glass']"/>
        <input 
            type="text" 
            placeholder="Search something..."
            class="bg-transparent ml-4 dark:text-white outline-none"
        />
    </div>
</template>

<script>
    export default {
        name: "Search",
    }
</script>