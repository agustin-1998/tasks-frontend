<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="flex flex-col max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-full">
        <UButton label="Add Task" color="blue" class="mb-5 self-end" @click="addTask()" v-if="tasks.length > 0"/>
        <div class="overflow-x-auto">
            <UTable :rows="tasks" :columns="columns" :loading="pending" class="border border-gray-500 rounded-xl "> 
                <template #loading-state>
                    <div class="flex items-center justify-center h-32">
                        <i class="loader --6" />
                    </div>
                </template>
                <template #empty-state>
                    <div class="flex flex-col items-center justify-center py-6 gap-3">
                        <span class="italic text-sm">No one here!</span>
                        <UButton label="Add Task" color="blue" @click="addTask()"/>
                    </div>
                </template>
                <template #action-data="{ row }">
                    <div class="space-x-3">
                        <UButton label="Edit" icon="i-heroicons-pencil-square" color="yellow" @click="editTask(row)" />
                        <UButton label="Delete" icon="i-heroicons-trash" color="red" @click="delTask(row)"/>
                    </div>
                </template>
            </UTable> 
        </div>
    </div>
    <CreateModal v-model:isOpen="isOpen" title='Create Task' />
  </div>
</template>

<script setup>
    import CreateModal from '~/components/CreateModal.vue';
    import { useTasksStore } from '~/store/tasks/tasks';
    const { $toast } = useNuxtApp();

    const tasksStore = useTasksStore();
    const pending = ref(true);
    const isOpen = ref(false);
    const tasks = computed(() => tasksStore.tasks)

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'title_truncated', label: 'Title' },
        { key: 'status', label: 'Status' },
        { key: 'due_date', label: 'Due Date' },
        { key: 'action', label: 'Actions' }
    ];

    const addTask = () => {
        isOpen.value = true;
    };

    const editTask = (id) => {
        console.log(id)
    }

    const delTask = async (task) => {
        try {
            await tasksStore.deleteTask({ id: task.id })
            await tasksStore.getTasks()
            $toast?.success(`Task Deleted Successfuly!`, { timeout: 3000,  closeOnClick: true, pauseOnFocusLoss: false, pauseOnHover: false, position: 'top-left' });
        } catch (error) {
            console.log(error)
        }
    }

    onMounted(async () => {
        await tasksStore.getTasks();
        pending.value = false;
    });
</script>

<style scoped>
    /* https://codepen.io/jenning/pen/YzNmzaV */

    .loader {
    --color: rgb(var(--color-primary-400));
    --size-mid: 6vmin;
    --size-dot: 1.5vmin;
    --size-bar: 0.4vmin;
    --size-square: 3vmin;

    display: block;
    position: relative;
    width: 50%;
    display: grid;
    place-items: center;
    }

    .loader::before,
    .loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    }

    /**
    loader --6
    **/
    .loader.--6::before {
    width: var(--size-square);
    height: var(--size-square);
    background-color: var(--color);
    top: calc(50% - var(--size-square));
    left: calc(50% - var(--size-square));
    animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
    }

    @keyframes loader-6 {

    0%,
    100% {
        transform: none;
    }

    25% {
        transform: translateX(100%);
    }

    50% {
        transform: translateX(100%) translateY(100%);
    }

    75% {
        transform: translateY(100%);
    }
    }
</style>
