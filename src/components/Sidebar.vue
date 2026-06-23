<template>
  <div
    :class="isSidebarOpen ? 'w-64' : 'w-17'"
    class="h-full shadow-lg bg-white flex flex-col transition-all duration-300"
  >
    <div>
      <h3
        class="text-lg text-[#109CF1] px-5 py-3 font-semibold border-b-2 border-b-zinc-100"
      >
        <span v-if="isSidebarOpen">Kadirov</span> Inc
      </h3>
    </div>

    <div
      class="flex items-center justify-center"
      :class="isSidebarOpen ? 'mb-5 p-5' : 'mb-5 mt-3 p-2'"
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQvyB-_cJTZL1o_QdHa0Ckw2WdP57zuNqey8Gu-JuQn3d7TTyevOyQmzY&s=10"
        alt="img"
        class="w-10 h-10 rounded-full object-cover"
      />

      <div v-if="isSidebarOpen" class="ml-3">
        <h3 class="font-bold text-sm">{{ authStore.state.user?.fullName }}</h3>
        <p class="text-xs text-gray-500">{{ authStore.state.user?.email }}</p>
      </div>
    </div>

    <div>
      <RouterLink
        active-class="!text-blue-600"
        to="/"
        class="flex items-center text-gray-700 font-medium mb-3 cursor-pointer hover:text-blue-500 px-5"
      >
        <span class="mdi mdi-view-dashboard text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Dashboard</span>
      </RouterLink>
      <RouterLink
        active-class=" !text-blue-600"
        to="/users"
        class="flex items-center text-gray-700 font-medium mb-3 cursor-pointer hover:text-blue-500 px-5"
      >
        <span class="mdi mdi-account-multiple text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Foydalanuvchilar</span>
      </RouterLink>
      <RouterLink
        active-class=" !text-blue-600"
        to="/companies"
        class="flex items-center text-gray-700 font-medium mb-3 cursor-pointer hover:text-blue-500 px-5"
      >
        <span class="mdi mdi-domain text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Kompaniyalar</span>
      </RouterLink>
      <RouterLink
        active-class=" !text-blue-600"
        to="/customers"
        class="flex items-center text-gray-700 font-medium mb-3 cursor-pointer hover:text-blue-500 px-5"
      >
        <span class="mdi mdi-account-tie text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Mijozlar</span>
      </RouterLink>

      <RouterLink
        active-class=" !text-blue-600"
        to="/settings"
        class="flex items-center text-gray-700 font-medium cursor-pointer hover:text-blue-500 mb-3 px-5 pt-3 border-t-2 border-t-zinc-100"
      >
        <span class="mdi mdi-dots-horizontal text-xl"></span>
        <span v-if="isSidebarOpen" class="ml-2 text-sm">Sozlamalar</span>
      </RouterLink>

      <button
        class="flex items-center text-gray-700 font-medium cursor-pointer hover:text-red-500 w-full px-5"
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
      <span v-if="isSidebarOpen" class="ml-2 text-sm">{{
        isSidebarOpen ? "Menyuni yopish" : "Menyuni ochish"
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
let isSidebarOpen = ref(true);
const authStore = useAuthStore();
</script>

<style scoped></style>
