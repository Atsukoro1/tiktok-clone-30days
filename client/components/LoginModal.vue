<template>
    <div class="bg-white dark:bg-gray-800 shadow-md h-fit rounded-lg p-4 w-fit mt-[160px]">
        <h1 class="text-2xl dark:text-white md:text-3xl font-extrabold">
            👋 Sign in to account
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-md mt-2 mb-4 table w-[300px] md:w-[400px]">
            Best site for sharing your best moments
            with your friends and family
        </p>

        <form 
            class="block clear-both"
            @submit.prevent="submitForm"
        >
            <div class="mb-2" v-for="(value) in list">
                <label class="text-slate-500 dark:text-slate-400 text-sm font-poppins font-bold" for="username">
                    {{ value.placeholder }}
                </label>
                <br>
                <input
                    class="bg-gray-50 dark:text-white border border-gray-300 dark:placeholder-slate-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :type="value.type" 
                    :name="value.type" 
                    :placeholder="value.example"
                />
            </div>


            <LoadingButton
                @click="submitForm"
                :state=buttonData.state
                :text=buttonData.text
                :additionalStyles=buttonData.additionalStyles
                :icon=buttonData.icon
            />

            <p class="text-center text-black dark:text-slate-400">
                Don't have an account?
                <a href="#" @click="$emit('close')" class="text-blue-600">
                    Register
                </a>
            </p>
        </form>
    </div>
</template>

<script>
    export default {
        name: "LoginModal",
        data() {
            return {
                buttonData: {
                    state: "idle",
                    text: "Login",
                    additionalStyles: "w-full mt-5",
                    icon: ["fas", "lock"]
                },
                list: [
                    {
                        name: "email",
                        type: "email",
                        placeholder: "Email",
                        example: "example@gmail.com"
                    },
                    {
                        name: "password",
                        type: "password",
                        placeholder: "Password",
                        example: "•••••••••"
                    }
                ]
            };
        },

        methods: {
            handleSuccess(res) {
                this.$auth.$storage.setUniversal(
                    "_token.custom",
                    res.data.token
                );

                this.buttonData = {
                    state: "success",
                    text: "Success",
                    additionalStyles: "w-full mt-5",
                    icon: ["fas", "check"]
                };

                setTimeout(() => {
                    this.$emit(
                        res.status === 200 
                            ? "submit" 
                            : "continue"
                        );
                }, 1000);
            },

            handleError() {
                this.buttonData = {
                    state: "error",
                    text: "Error",
                    additionalStyles: "w-full mt-5",
                    icon: ["fas", "times"]
                };

                setTimeout(() => {
                    this.buttonData = {
                        state: "idle",
                        text: "Register",
                        additionalStyles: "w-full mt-5",
                        icon: null
                    };
                }, 1000);
            },

            async submitForm(e) {
                e.preventDefault();

                this.buttonData = {
                    state: "loading",
                    text: "Loading",
                    additionalStyles: "w-full mt-5",
                    icon: ["fas", "spinner"]
                };

                this.$auth.loginWith(
                    'custom', 
                    {
                        data: {
                            email: e.target.email.value,
                            password: e.target.password.value
                        }
                    }
                )
                .then(res => {
                    console.log(res);
                    this.handleSuccess(res);
                })
                .catch(err => {
                    console.log(err);
                    this.handleError();
                });
            }
        }
    }   
</script>