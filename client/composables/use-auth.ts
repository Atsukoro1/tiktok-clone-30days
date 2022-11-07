import { NuxtApp } from "@nuxt/types/app";
import { inject } from "vue";   

export const useAuth = () => {
    const app = inject("nuxtApp") as NuxtApp;
    
    const login = async (email: string, password: string) => {
        try {
            const res = await app.$auth.loginWith("local", { 
                data: { 
                    email, 
                    password 
                } 
            });

            return res;
        } catch (error) {
            return error;
        }
    };

    const logout = async () => {
        try {
            await app.$auth.logout();
        } catch (error) {
            console.log(error);
        }
    };

    const register = async (email: string, password: string, username: string) => {
        try {
            const res = await app.$auth.loginWith("local", {
                data: {
                    username,
                    email,
                    password
                }
            });

            return res;
        } catch (error) {
            return error;
        }
    };

    return { login, logout, register }
}