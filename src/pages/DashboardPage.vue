<template>
  <div class="flex gap-5 w-full mt-5">
    <div class="p-5 bg-white rounded-lg shadow-md h-fit w-1/3">
      <h2 class="text-2xl font-bold mb-4 text-gray-600">Users</h2>
      <p class="text-blue-600 text-lg">{{ userStore.state.usersCount }} ta</p>
    </div>
    <div class="p-5 bg-white rounded-lg shadow-md h-fit w-1/3">
      <h2 class="text-2xl font-bold mb-4 text-gray-600">My Companies</h2>
      <p class="text-blue-600 text-lg">{{ companyStore.state.myCompaniesCount }} ta</p>
    </div>
    <div class="p-5 bg-white rounded-lg shadow-md h-fit w-1/3">
      <h2 class="text-2xl font-bold mb-4 text-gray-600">My Customers</h2>
      <p class="text-blue-600 text-lg">{{ companyStore.getMyCustomersCount }} ta</p>
    </div>

  </div>
</template>

<script setup>
import { useCompanyStore } from '@/stores/companyStore';
import { useUserStore } from '@/stores/userStore';

const companyStore = useCompanyStore();
const userStore = useUserStore();
</script>

<style scoped></style>
