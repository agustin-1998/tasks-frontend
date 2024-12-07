<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Title" name="title">
            <UInput v-model="state.title"/>
        </UFormGroup>

        <UFormGroup label="Description" name="description">
            <UTextarea v-model="state.description" autoresize resize />
        </UFormGroup>

        <UFormGroup label="Status" name="status">
            <USelect v-model="state.status" :options="statuses" option-attribute="name" />
        </UFormGroup>

        <UFormGroup label="Due Date" name="due_date">
            <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyyy')" />
                <template #panel="{ close }">
                    <DatePicker v-model="date" @close="close"/>
                </template>
            </UPopover>
        </UFormGroup>

        <UButton type="submit" color="orange">
            Create
        </UButton>
    </UForm>
</template>

<script setup>
    import { object, string } from 'yup'
    import { format } from 'date-fns'
    import DatePicker from '../DatePicker.vue';
    import { dateFormat } from '~/utils/formatDate';
    import { useTasksStore } from '~/store/tasks/tasks';
    
    const useTask = useTasksStore()

    const props = defineProps({
        clearAll: {
            type: Boolean,
        }
    })

    const statuses = [
        {
            name: 'In Progress',
            value: 'in_progress'
        },
        {
            name: 'Pending',
            value: 'pending'
        },
        {
            name: 'Completed',
            value: 'completed'
        }
    ]
    
    const date = ref(new Date())
        
    const schema = object({
        title: string().required('Required').trim().max(255, 'Must be less than 255 characters'),
        description: string().min(200, 'Must be at least 200 characters').required('Required').trim(),
    })
    
    const state = reactive({
        title: '',
        description: '',
        status: 'in_progress',
    })
    
    async function onSubmit(event) {
        try {
            await useTask.createTask({ 
                title: event.data.title, 
                description: event.data.description, 
                status: event.data.status,
                due_date: dateFormat(date.value) 
            });
            await useTask.getTasks()
        } catch (error) {
            console.log(error);
        }
    }
</script>
