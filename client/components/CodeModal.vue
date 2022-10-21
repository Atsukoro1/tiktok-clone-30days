<template>
    <div class="shadow-md h-fit text-center bg-white rounded-lg p-4 w-fit mt-[100px]">
        <h1 class="text-3xl font-extrabold">
        📷 Enter the code
        </h1>
        <p class="text-slate-500 text-md mt-5 mb-4 table w-[500px] mt-3">
            There is a six digit code in your two factor auth application
            that you need to enter here to login to your account.
        </p>

        <div class="flex justify-center flex-row">
            <input 
                class="m-2 h-[50px] w-10 bg-slate-100 border-bottom border-slate-300 text-slate-500 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-for="i in 6"
                maxlength="1"
                :placeholder=i
            >
        </div>

        <button class="w-full bg-[#2557D6]/90 mt-5 text-white px-5 py-2.5 rounded-lg text-sm hover:cursor-pointer">
            Submit
        </button>
    </div>
</template>

<script>
    export default {
        name: 'CodeModal',
    }
</script>