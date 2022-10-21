<template>
    <div class="bg-white shadow-md h-fit rounded-lg p-4 w-fit mt-[100px]">
        <h1 class="text-3xl font-extrabold">
            👋 Create a new account
        </h1>
        <p class="text-slate-500 text-md mt-2 mb-4 table w-[400px]">
            Best site for sharing your best moments
            with your friends and family
        </p>

        <form v-on:submit="submitForm" class="block clear-both">
            <div class="mb-2" v-for="(value) in list">
                <label class="text-slate-500 text-sm font-poppins font-bold" for="username">
                    {{ value.placeholder }}
                </label>
                <br>
                <input
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :type="value.type" 
                    :name="value.name" 
                    :placeholder="value.example"
                />
            </div>

            <button 
                type="submit"
                class="mt-5 w-full text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none 
                        font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center align-centers inline-flex items-center 
                        dark:focus:ring-[#2557D6]/50 mr-2 mb-5">
                    <fa 
                        :icon="['fas', 'lock']"
                        class="text-white"
                    />
                    &nbsp;
                    Register
            </button>

            <p class="text-center">
                Already have an account?
                <a href="#" @click="$emit('close')" class="text-blue-600">
                    Login
                </a>
            </p>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'RegisterModal',
        data() {
            return {
                list: [
                    {
                        name: 'username',
                        type: 'text',
                        placeholder: 'Username',
                        example: 'Sharky'
                    },
                    {
                        name: 'email',
                        type: 'email',
                        placeholder: 'Email',
                        example: 'example@gmail.com'
                    },
                    {
                        name: 'password',
                        type: 'password',
                        placeholder: 'Password',
                        example: '•••••••••'
                    },
                    {
                        name: 'passwordConfirm',
                        type: 'password',
                        placeholder: 'Confirm Password',
                        example: '•••••••••'
                    },
                ]
            }
        },
        methods: {
            submitForm(e) {
                e.preventDefault();
                console.log(e);
            }
        }
    }
</script>