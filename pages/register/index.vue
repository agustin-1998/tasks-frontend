<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <section class="border border-green-500 p-10 rounded-lg">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Name" name="name">
                    <UInput v-model="state.name" />
                </UFormGroup>

                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                    <UInput v-model="state.password" type="password" />
                </UFormGroup>

                <UFormGroup label="Confirm Password" name="password_confirmation" @click="isError = false">
                    <UInput v-model="state.password_confirmation" type="password"/>
                </UFormGroup>

                <div class="flex justify-between items-center w-full">
                    <UButton type="submit">
                        Register
                    </UButton>
                    <ULink
                        to="/"
                        active-class="text-primary"
                        inactive-class="text-gray-500 dark:text-gray-400 underline hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Login
                    </ULink>
                </div>
            </UForm>
        </section>
    </div>
</template>

<script setup>
    import { object, string, ref } from 'yup'
    import { useAuthStore } from '~/store/auth/auth';

    const authStore = useAuthStore()

    definePageMeta({
        middleware: 'guest'
    })

    const state = reactive({
        email: '',
        password: '',
        name: '',
        password_confirmation: '',
    })

    const schema = object({
        name: string()
            .required('Required')
            .max(50, 'Must be less than 50 characters').trim(),
        email: string()
            .email('Invalid email')
            .required('Required').trim(),
        password: string()
            .min(8, 'Must be at least 8 characters')
            .required('Required').trim(),
        password_confirmation: string()
            .oneOf([ref('password')], 'Passwords must match')
            .required('Required').trim()
    });

    async function onSubmit(event) {
        try {
            await authStore.register({ email: event.data.email, password: event.data.password, name: event.data.name, password_confirmation: event.data.password_confirmation });
        } catch (error) {
            console.log(error);
        }
    }
</script>