<template>
    <div class="bg-white dark:bg-gray-800 shadow-md h-fit rounded-lg p-4 w-fit mt-[160px]">
        <h1 class="dark:text-white text-2xl md:text-3xl font-extrabold">
            👋 Create a new account
        </h1>
        <p class="dark:text-gray-400 text-slate-500 text-md mt-2 mb-4 table w-[300px] md:w-[400px]">
            Best site for sharing your best moments
            with your friends and family
        </p>

        <form @submit.prevent="submitForm" class="block clear-both">
            <div class="mb-2" v-for="(value) in list">
                <label class="dark:text-gray-400 text-slate-500 text-sm font-poppins font-bold" for="username">
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

            <LoadingButton
                @click="submitForm"
                :state=buttonData.state
                :text=buttonData.text
                :additionalStyles=buttonData.additionalStyles
                :icon=buttonData.icon
            />

            <p class="text-black dark:text-gray-400 text-center">
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
    name: "RegisterModal",
    data() {
        return {
            buttonData: {
                state: "idle",
                text: "Register",
                additionalStyles: "w-full mt-5",
                icon: ["fas", "lock"]
            },
            list: [
                {
                    name: "username",
                    type: "text",
                    placeholder: "Username",
                    example: "Sharky"
                },
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
                },
                {
                    name: "passwordConfirm",
                    type: "password",
                    placeholder: "Confirm Password",
                    example: "•••••••••"
                },
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
                text: "Registered!",
                additionalStyles: "w-full mt-5",
                icon: ["fas", "check"]
            };

            setTimeout(() => {
                this.$emit("close");
            }, 1000);
        },

        handleError() {
            this.buttonData = {
                state: "error",
                text: "Error!",
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

            this.$auth.loginWith(
                'custom', 
                {
                    data: {
                        email: e.target.email.value,
                        password: e.target.password.value,
                        username: e.target.username.value,
                    }
                }
            )
            .then(res => {
                this.handleSuccess(res);
            })
            .catch(err => {
                this.handleError();
            });
        }
    }
}
</script>