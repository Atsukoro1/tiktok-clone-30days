<template>
    <div class="shadow-md h-fit text-center dark:bg-gray-800 bg-white rounded-lg p-4 w-fit mt-[160px]">
        <h1 class="text-3xl dark:text-white font-extrabold">
            ✅ Welcome back!
        </h1>

        <p class="text-slate-500 dark:text-gray-400 text-md mt-5 mb-4 table mr-auto ml-auto w-[240px] md:w-[500px] mt-3">
            Thanks for logging in! You will be automatically redirected to 
            the main page in a few seconds...
        </p>
    </div>
</template>

<script>
    export default {
        name: "DoneModal",
        created() {
            setTimeout(() => {
                this.$router.push({ name: 'index' });
            }, 3000);
        }
    }
</script>