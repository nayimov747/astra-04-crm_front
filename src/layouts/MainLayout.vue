<template>
  <div class="w-full max-w-385 mx-auto flex gap-6 p-5 h-screen ">
    <Sidebar />
    <RouterView />
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import { Button } from 'primevue';

</script>

<style scoped></style>
