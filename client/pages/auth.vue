<template>
    <div class="w-full h-full flex justify-center vertical-align-centers">
        <div 
            v-if="authState == 'register'"
            class="shadow-md rounded-lg p-4 w-fit align-center"
        >
            <h1 class="text-3xl font-poppins font-extrabold">
                👋 Create a new account
            </h1>
            <p class="text-slate-500 text-lg mt-2 mb-2 table w-[400px]">
                Best site for sharing your best moments
                with your friends and family
            </p>

            <form class="block clear-both">
                <div
                    class="mb-2"
                    v-for="(value, _, __) in [
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
                    ]">
                        <label for="username">{{ value.placeholder }}</label>
                        <br>
                        <input 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            :type="value.type"
                            :name="value.type" 
                            :placeholder="value.example"
                        />
                </div>

                <button type="button" class="mt-5 w-full text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center align-centers inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
                  <svg aria-hidden="true" class="mr-2 -ml-1 w-10 h-3" viewBox="0 0 256 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.812 0L0 63.76H34.492L38.768 53.594H48.542L52.818 63.76H90.784V56.001L94.167 63.76H113.806L117.189 55.837V63.76H196.148L205.749 53.858L214.739 63.76L255.294 63.842L226.391 32.058L255.294 0H215.368L206.022 9.71899L197.315 0H111.418L104.042 16.457L96.493 0H62.073V7.495L58.244 0C58.244 0 28.812 0 28.812 0ZM35.486 9.05399H52.299L71.41 52.29V9.05399H89.828L104.589 40.054L118.193 9.05399H136.519V54.806H125.368L125.277 18.955L109.02 54.806H99.045L82.697 18.955V54.806H59.757L55.408 44.549H31.912L27.572 54.797H15.281C15.281 54.797 35.486 9.05399 35.486 9.05399ZM146.721 9.05399H192.063L205.931 24.034L220.246 9.05399H234.114L213.043 32.049L234.114 54.779H219.617L205.749 39.625L191.361 54.779H146.721V9.05399ZM43.665 16.795L35.924 35.067H51.397L43.665 16.795ZM157.918 18.527V26.879H182.654V36.188H157.918V45.306H185.663L198.555 31.876L186.21 18.519H157.918V18.527Z" fill="white"/></svg>
                  Register
                </button>

                <p>
                    Already have an account? 
                    <a href="#" @click="authState = 'login'">Login</a>
                </p>
            </form>
        </div>

        <div v-if="authState == 'login'">
            login
        </div>

        <div v-if="authState == '2fa-qrcode'">
            2Fa qrcode
        </div>

        <div v-if="authState == '2fa-code'">
            2FA Code
        </div>

        <div v-if="authState == 'done'">
            Done!
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        name: 'AuthPage',
        data() {
            return {
                authState: 'register',
            }
        }
    });
</script>