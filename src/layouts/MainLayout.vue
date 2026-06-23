<template>
  <div class="w-full max-w-385 mx-auto flex h-screen ">
    <Sidebar />
    <div class="pl-5 w-full">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
</script>

<style scoped></style>
