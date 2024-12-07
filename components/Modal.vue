
<template>
  <div>
    <UModal v-model="props.isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ title }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="onClose" />
          </div>
        </template>
        <slot />
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        onClose: {
            type: Function,
            required: true,
        },
    })

    const emit = defineEmits(['update:isOpen']); 
</script>
