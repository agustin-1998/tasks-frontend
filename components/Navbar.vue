<template>
    <header class="fixed top-0 flex items-center justify-end w-full px-10 py-5" v-if="useAuth.token">
        <div class="space-x-5">
            <label>
                Hi! {{ userName }}
            </label>
            <UButton color="red" variant="outline" @click="logout">Logout</UButton>
        </div>
    </header>
</template>

<script setup>
    import { useAuthStore } from '~/store/auth/auth';

    const useAuth = useAuthStore()
    const userName = computed(() => useAuth.user?.name)

    function logout() {
        if(confirm('Are you sure?')){
            useAuth.logout()
        }
    }
</script>