<template>
    <div class="shadow-md dark:bg-gray-800 h-fit bg-white rounded-lg p-4 w-fit mt-[160px] flex flex-row">
        <div class="mr-4">
            <h1 class="dark:text-white text-3xl font-extrabold">
            📷 Connect 2FA to your account
            </h1>
            <p class="dark:text-gray-400 text-slate-500 text-md mt-5 mb-4 table w-[500px] mt-3">
                Scan this QR code with your favourite two factor authorization
                app and use it to login to your account.
            </p>

            <div>
                <button 
                    class="bg-[#2557D6]/90 mt-5 text-white px-5 py-2.5 rounded-lg text-sm hover:cursor-pointer"
                    v-on:click="$emit('abort')"
                >
                    Don't use 2FA
                </button>

                <label v-on:click="$emit('submit')">
                    <LoadingButton
                        text="Done"
                        additionalStyles="ml-2"
                        state="success"
                        :icon="['fas', 'check']"
                    />
                </label>
            </div>
        </div>

        <img
            v-if="codeData"
            class="w-[180px] h-[180px] dark:rounded-lg"
            :src=codeData
            alt="qkod"
        />
    </div>
</template>

<script>
    export default {
        name: "QrCodeModal",
        data() {
            return {
                loading: true,
                codeData: null
            }
        },

        methods: {
            handleSuccess(res) {
                this.loading = false;
                this.codeData = res.data.qrcode;
            },

            handleError(err) {
                console.log(err);
                this.$emit('abort');
            }
        },
        
        created() {
            this.$axios.post('/user/settings/get-2fa-code')
                .then(res => this.handleSuccess(res))
                .catch(err => this.handleError(err));
        }
    }
</script>