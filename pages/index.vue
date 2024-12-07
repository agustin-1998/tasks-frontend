<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <section class="border border-green-500 p-10 rounded-lg">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <label class="text-red-500" v-if="isError" >
                    {{ errorMessage }}
                </label>
                <UFormGroup label="Email" name="email" @click="isError = false">
                    <UInput v-model="state.email"/>
                </UFormGroup>

                <UFormGroup label="Password" name="password" @click="isError = false">
                    <UInput v-model="state.password" type="password"/>
                </UFormGroup>

                <div class="flex justify-between items-center">
                    <UButton type="submit">
                        Login
                    </UButton>
                    <ULink
                        to="/register"
                        active-class="text-primary"
                        inactive-class="text-gray-500 dark:text-gray-400 underline hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Register
                    </ULink>
                </div>
            </UForm>
        </section>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: 'guest'
    })
    
    import { useAuthStore } from '~/store/auth/auth'; 
    import { object, string } from 'yup'
    const { $toast } = useNuxtApp();
    
    const authStore = useAuthStore();
    const route = useRoute()
    let isError = ref(false)
    const errorMessage = ref('Invalid credentials. Please check your email and password.')

    if (route.query.showMessage == "true") {
        $toast?.success('Now you can log in!', { timeout: 3000,  closeOnClick: true, pauseOnFocusLoss: false, pauseOnHover: false });
    }
    
    const schema = object({
        email: string().email('Invalid email').required('Required').trim(),
        password: string()
        .min(8, 'Must be at least 8 characters')
        .required('Required').trim()
    })
    
    const state = reactive({
        email: undefined,
        password: undefined
    })
    
    async function onSubmit(event) {
        try {
            await authStore.login({ email: event.data.email, password: event.data.password });
        } catch (error) {
            console.log(error);
            isError.value = true
        }
    }
</script>