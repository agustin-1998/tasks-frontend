<template>
    <Navbar />
    <main class="flex flex-col min-h-screen">
        <slot class="flex-1" />
    </main>
</template>

<script setup>
    import Navbar from '~/components/Navbar.vue';
</script>