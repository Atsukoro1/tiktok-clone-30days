<template>
    <client-only>
    <div 
        v-on:submit="submitForm"
        class="shadow-md h-fit text-center dark:bg-gray-800 bg-white rounded-lg p-4 w-fit mt-[160px]"
    >
        <h1 class="text-2xl dark:text-white md:text-3xl font-extrabold">
        📷 Enter the code
        </h1> 
        <p class="text-slate-500 dark:text-gray-300 text-sm md:text-md mt-5 mb-4 table w-[250px] md:w-[500px] mt-3">
            There is a six digit code in your two factor auth application
            that you need to enter here to login to your account.
        </p>

        <form action="">
            <div class="flex w-[220px] md:w-[280px] ml-auto mr-auto justify-center flex-row">
                <input 
                    class="m-1 md:m-2 h-[40px] w-[40px] bg-slate-100 border-bottom border-slate-300 text-slate-500 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-for="num in [1,2,3,4,5,6]"
                    autofocus
                    maxlength="1"
                    :placeholder=num
                >
            </div>

            <LoadingButton
                @click="submitForm"
                :state=buttonData.state
                :text=buttonData.text
                :additionalStyles=buttonData.additionalStyles
                :icon=buttonData.icon
            />
        </form>
    </div>
</client-only>
</template>

<script>
    export default {
        name: 'CodeModal',
        props: {
            funcType: {
                type: String,
                default: "login"
            },
        },
        data() {
            return {
                buttonData: {
                    state: "idle",
                    text: "Submit",
                    additionalStyles: "w-full mt-5",
                    icon: ["fas", "lock"]
                }
            }
        },
        methods: {
            handleSuccess(res) {
                this.$auth.$storage.setUniversal('_token.custom', res.data.token);

                // Fetch user and save it to universal storage
                this.$axios.get('/@me/user')
                    .then(res => {
                        this.$auth.$storage.setUniversal('user', res.data);
                        this.$router.push({ name: 'home' });

                        this.$emit("submit");
                    })
                    .catch(err => {
                        return;
                    });

                this.buttonData = {
                    state: "success",
                    text: "Success",
                    additionalStyles: "w-full mt-5",
                    icon: ["fas", "check"]
                };

                setTimeout(() => {
                    this.$emit('submit');
                }, 1000);
            },

            handleError(err) {
                console.log(err);

                this.buttonData = {
                    state: "error",
                    text: "Error",
                    additionalStyles: "w-full mt-5",
                    icon: ["fas", "times"]
                };

                setTimeout(() => {
                    this.buttonData = {
                        state: "idle",
                        text: "Submit",
                        additionalStyles: "w-full mt-5",
                        icon: ["fas", "times"]
                    };
                }, 1000);
            },

            submitForm(e) {
                e.preventDefault();

                let finalStr = "";
                for(let i = 0; i < 6; i++) {
                    finalStr += e.target[i].value;
                }

                this.buttonData = {
                    state: "loading",
                    text: "Loading",
                    additionalStyles: "w-full mt-5",
                    icon: ["fas", "spinner"]
                };

                this.$axios.post(
                    `/user/${this.funcType == "login" ? "auth" : "settings"}/${this.funcType == "login" ? "2fa" : "verify-2fa"}`,
                    {
                        code: finalStr
                    }
                )
                    .then(res => this.handleSuccess(res))
                    .catch(err => this.handleError(err));
            },

            keyPressed(e) {
                e.preventDefault();

                if(isNaN(e.key)) return;

                const actEl = document.activeElement;
                const nextEl = actEl.nextElementSibling;
            
                // If the next element is null, we are at the end of the input
                if(nextEl) {
                    nextEl.focus();
                };
            
                actEl.value = e.key;
            
                // Change the color of input to less visible one
                if(actEl.value != "") {
                    actEl.classList.add("bg-slate-50");
                } else {
                    actEl.classList.remove("bg-slate-50");
                }
            }
        },
        mounted() {
            if(typeof document !== undefined) {
                document.addEventListener('keydown', this.keyPressed);
            }
        }
    }
</script>