<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';
import { useCompanyStore } from './stores/companyStore';
import { useUserStore } from './stores/userStore';
import { ConfirmDialog, Toast } from 'primevue';

const authStore = useAuthStore();
const companiesStore = useCompanyStore();
const userStore = useUserStore();

onMounted(async () => {
  await authStore.fetchMe();
  await companiesStore.fetchMyCompanies(
    authStore.state.user?.id
  );
  await userStore.fetchUsers();
});
</script>

<template>
  <component :is="$route.meta.layout" />
  <confirm-dialog />
  <toast />
</template>

<style scoped></style>
