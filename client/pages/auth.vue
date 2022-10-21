<template>
    <div class="w-full h-full flex justify-center align-center bg-slate-50">
        <RegisterModal
            v-if="authState == 'register'" 
            @close="authState = 'login'"
        />

        <LoginModal
            v-if="authState == 'login'" 
            @close="authState = 'register'"
        />

        <QrCodeModal
            v-if="authState == 'qrcode'"
            @close="authState = 'login'"
            @abort="authState = 'login'"
        />

        <CodeModal
            v-if="authState == 'code'"
            @submit="authState = 'login'"
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
                authState: "login"
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