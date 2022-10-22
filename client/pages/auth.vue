<template>
    <div class="w-full h-full flex justify-center align-center bg-slate-50">
        <RegisterModal
            v-if="authState == 'register'" 
            @close="authState = 'qrcode'"
        />

        <LoginModal
            v-if="authState == 'login'" 
            @close="authState = 'register'"
            @submit="authState = 'done'"
            @continue="authState = 'code'"
        />

        <QrCodeModal
            v-if="authState == 'qrcode'"
            @submit="authState = 'code'"
            @abort="authState = 'login'"
        />

        <CodeModal
            v-if="authState == 'code'"
            @submit="authState = 'done'"
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