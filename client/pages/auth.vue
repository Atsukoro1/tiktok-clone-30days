<template>
    <div class="w-full h-full flex justify-center align-center bg-slate-50 dark:bg-gray-700">
        <Navbar></Navbar>

        <RegisterModal
            v-if="authState == 'register'" 
            @close="authState = 'qrcode'"
        />

        <LoginModal
            v-if="authState == 'login'" 
            @close="authState = 'register'"
            @submit="authState = 'done'"
            @continue="authState = 'login-code'"
        />

        <QrCodeModal
            v-if="authState == 'qrcode'"
            @submit="authState = 'verify-code'"
            @abort="authState = 'login'"
        />

        <CodeModal
            v-if="authState == 'login-code'"
            @submit="authState = 'done'"
            funcType="login"
        />

        <CodeModal
            v-if="authState == 'verify-code'"
            @submit="authState = 'done'"
            funcType="verify-code"
        />
        
        <DoneModal v-if="authState == 'done'"/>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    name: "AuthPage",
    data() {
        return {
            authState: "qrcode"
        };
    }
});
</script>

<style>
    html, body, #__nuxt, #__layout {
      height: 100% !important;
      width: 100% !important;
    }
</style>