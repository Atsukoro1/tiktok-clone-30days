<template>
    <div v-on:keydown="keyPressed" class="shadow-md h-fit text-center bg-white rounded-lg p-4 w-fit mt-[100px]">
        <h1 class="text-3xl font-extrabold">
        📷 Enter the code
        </h1>
        <p class="text-slate-500 text-md mt-5 mb-4 table w-[500px] mt-3">
            There is a six digit code in your two factor auth application
            that you need to enter here to login to your account.
        </p>

        <div class="flex justify-center flex-row">
            <input 
                class="m-2 h-[50px] w-[35px] bg-slate-100 border-bottom border-slate-300 text-slate-500 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-for="num in [1,2,3,4,5,6]"
                autofocus
                maxlength="1"
                :placeholder=num
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
        methods: {
            keyPressed(e) {
                e.preventDefault();

                if(isNaN(e.key)) return;

                const actEl = document.activeElement;
                const nextEl = actEl.nextElementSibling;
            
                // If the next element is null, we are at the end of the input
                if(nextEl) {
                    nextEl.focus();
                }
            
                actEl.value = e.key;
            
                // Change the color of input to less visible one
                if(actEl.value != "") {
                    actEl.classList.add("bg-slate-50");
                } else {
                    actEl.classList.remove("bg-slate-50");
                }
            }
        }
    }
</script>