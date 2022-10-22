<template>
    <button :class="buttonStates[state] + additionalStyles">
        <fa 
            v-if="typeof icon === 'object'"
            :icon="icon"
            :class="iconStates[state]"
        />
        <label v-if="typeof icon === 'object'">
            &nbsp;
        </label>
        {{ text }}
    </button>
</template>

<script>
    const styleBase = `
        text-white focus:ring-4 mr-2 mb-5 align-centers justify-center
        focus:ring-[#2557D6]/50 focus:outline-none inline-flex items-center 
        font-medium rounded-lg text-sm px-5 py-2.5 flex
    `;

    export default {
        name: "LoadingButton",
        props: {
            state: {
                type: String,
                default: "idle"
            },
            text: {
                type: String,
                default: "Loading"
            },
            icon: {
                type: Array,
                default: null
            },
            additionalStyles: {
                type: String
            }
        },
        data() {
            return {
                iconStates: {
                    idle: "text-white",
                    loading: "animate-spin text-white",
                    success: "animate-pulse text-white",
                    error: "text-white"
                },
                buttonStates: {
                    idle: `${styleBase} bg-[#2557D6] focus:ring-[#2557D6]/50 `,
                    loading: `${styleBase} bg-[#2557D6] focus:ring-[#2557D6]/50 `,
                    success: `${styleBase} bg-[#84cc16] focus:ring-[#84cc16]/50 `,
                    error: `${styleBase} bg-[#ef4444] focus:ring-[#ef4444]/50 `,
                }
            }
        }
    }
</script>