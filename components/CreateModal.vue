<template>
    <div>
        <Modal :title="title" v-model:isOpen="props.isOpen" :onClose="closeModal">
            <CreateForm :clearAll />
        </Modal>
    </div>
</template>

<script setup>
    import Modal from './Modal.vue';
    import CreateForm from './forms/CreateForm.vue';

    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        isOpen: {
            type: Boolean,
            required: true
        },
    })

    const emit = defineEmits(['update:isOpen']); 
    const clearAll = ref(false)

    const closeModal = () => {
        clearAll.value = true
        emit('update:isOpen', false); 
    };
</script>

<style lang="scss" scoped>


</style>