<template>
  <div class="flex flex-col gap-5 w-full items-center justify-center h-full">
    <h1 class="text-center text-4xl text-gray-800 font-bold">CRM login</h1>
    <form class="flex flex-col items-center gap-2 mb-5" @submit.prevent="authStore.login({email, password})">
      <input
        type="email"
        placeholder="Email"
        class="w-100 p-2 border border-gray-900 outline-0 rounded-md "
        v-model="email"
      />
      <input
        type="password"
        placeholder="Parol"
        class="w-100 p-2 border border-gray-900 outline-0 rounded-md"
        v-model="password"
      />
      <button
        class="bg-gray-800 w-full text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300 text-nowrap cursor-pointer"
      >
        Kirish
      </button>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
const email = ref('');
const password = ref('');

const authStore = useAuthStore();


</script>

<style scoped>

</style>