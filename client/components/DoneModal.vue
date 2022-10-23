<template>
    <div class="shadow-md h-fit text-center bg-white rounded-lg p-4 w-fit mt-[160px]">
        <h1 class="text-3xl font-extrabold">
            ✅ Welcome back!
        </h1>

        <p class="text-slate-500 text-md mt-5 mb-4 table w-[500px] mt-3">
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
                this.$emit('close');
            }, 3000);
        }
    }
</script>