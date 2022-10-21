<template>
    <div class="w-full h-full flex justify-center align-center">
        <RegisterModal
            v-if="authState == 'register'" 
            @close="authState = 'login'"
            authState=authState
        />

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
    name: "AuthPage",
    data() {
        return {
            authState: "register"
        };
    }
});
</script>