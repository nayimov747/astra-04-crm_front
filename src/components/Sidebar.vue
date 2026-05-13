<template>
  <div
  :class="isSidebarOpen ? 'w-[256px]' : 'w-16'"
  class="h-full shadow-lg  bg-white rounded-lg flex flex-col transition-all duration-300"
>
    <div class="flex items-center justify-center" :class="isSidebarOpen ? 'mb-5 p-5' : 'mb-5 mt-3 p-2'">
      <img
        src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
        alt="img"
        class="w-10 h-10 rounded-full"
      />

      <div v-if="isSidebarOpen" class="ml-3">
        <h3  class="font-bold text-sm">{{ authStore.state.user?.fullName }}</h3>
        <p class="text-xs text-gray-500">{{ authStore.state.user?.email }}</p>
      </div>
    </div>

    <div class="p-5">
      <RouterLink
        active-class="!text-blue-600"
        to="/"
        class="flex items-center text-gray-700 font-medium mb-3 cursor-pointer hover:text-blue-500"
      >
        <span class="mdi mdi-view-dashboard text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Dashboard</span>
      </RouterLink>
      <RouterLink
        active-class=" !text-blue-600"
        to="/users"
        class="flex items-center text-gray-700 font-medium mb-3 cursor-pointer hover:text-blue-500"
      >
        <span class="mdi mdi-account-multiple text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Foydalanuvchilar</span>
      </RouterLink>
      <RouterLink
        active-class=" !text-blue-600"
        to="/companies"
        class="flex items-center text-gray-700 font-medium mb-3 cursor-pointer hover:text-blue-500"
      >
        <span class="mdi mdi-domain text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Kompaniyalar</span>
      </RouterLink>
      <!-- <RouterLink
        active-class=" !text-blue-600"
        to="/customers"
        class="flex items-center text-gray-700 font-medium mb-3 cursor-pointer hover:text-blue-500"
      >
        <span class="mdi mdi-account-tie text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Mijozlar</span>
      </RouterLink> -->

      <RouterLink
        active-class=" !text-blue-600"
        to="/settings"
        class=" flex items-center text-gray-700 font-medium cursor-pointer hover:text-blue-500 mb-3"
      >
        <span class="mdi mdi-cog text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Sozlamalar</span>
      </RouterLink>

      <button
        class=" flex items-center text-gray-700 font-medium cursor-pointer hover:text-red-500 w-full"
        @click="authStore.logout()"
      >
        <span class="mdi mdi-logout text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Chiqish</span>
      </button>
    </div>


    <div
      class="p-5 flex items-center text-gray-700 font-medium mt-auto cursor-pointer hover:text-blue-500"
      @click="isSidebarOpen = !isSidebarOpen"
    >
      <span
        :class="
          isSidebarOpen
            ? 'mdi mdi-arrow-left-bold-box text-xl'
            : 'mdi mdi-arrow-right-bold-box text-xl'
        "
      ></span>
      <span v-if="isSidebarOpen" class="ml-2 text-sm">{{ isSidebarOpen ? 'Menyuni yopish' : 'Menyuni ochish' }}</span>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
let isSidebarOpen = ref(true);
const authStore = useAuthStore();
</script>

<style scoped></style>
