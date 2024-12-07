import { useAuthStore } from "~/store/auth/auth";

export default defineNuxtRouteMiddleware(() => {
    if (process.client) {
        const token = localStorage.getItem('auth_token');
        const authStore = useAuthStore();
    
        if (!token || !authStore.token) {
        return navigateTo('/');
        }
    }
});
  