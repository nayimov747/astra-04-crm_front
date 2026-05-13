<template>
  <div class="flex flex-col gap-5 w-full">
    <div
      class="p-5 bg-white rounded-lg shadow-md flex items-center gap-2 justify-between"
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search by name or email"
        class="w-100 p-2 border border-gray-300 rounded-md"
        v-model="term"
      />
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 text-nowrap cursor-pointer"
        @click="visible = true"
      >
        Foydalanuvchi qo'shish
      </button>
      <Dialog
        v-model:visible="visible"
        modal
        :header="
          isEdit ? 'Foydalanuvchini tahrirlash' : 'Foydalanuvchi qo‘shish'
        "
        :style="{ width: '25rem' }"
      >
        <!-- <span class="text-gray-500 dark:text-gray-400 block mb-8"
          >Yangi foydalanuvchi qo'shish</span
        > -->
        <div class="flex items-center gap-4 mb-4">
          <label for="fullName" class="font-semibold w-24 text-gray-500"
            >Full Name</label
          >
          <InputText
            id="fullName"
            v-model="userData.fullName"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="email" class="font-semibold w-24 text-gray-500"
            >Email</label
          >
          <InputText
            id="email"
            v-model="userData.email"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div v-if="!isEdit" class="flex items-center gap-4 mb-8">
          <label for="password" class="font-semibold w-24 text-gray-500">
            Password
          </label>

          <InputText
            id="password"
            v-model="userData.password"
            class="flex-auto"
            type="password"
            autocomplete="off"
          />
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="cancel"
          ></Button>
          <Button
            type="submit"
            :label="isEdit ? 'Update' : 'Save'"
            @click="saveUser"
          />
        </div>
      </Dialog>
    </div>
    <div class="p-5 bg-white shadow-md rounded-lg">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-b-gray-300">
            <th class="text-left p-2">№</th>
            <th class="text-left p-2">Ism</th>
            <th class="text-left p-2">Email</th>
            <th class="text-left p-2">Role</th>
            <th class="text-left p-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-b border-b-gray-300 hover:bg-gray-100 transition-colors duration-300 last:border-b-0"
            :class="
              user.email === authStore.state.user?.email
                ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                : ''
            "
          >
            <!-- <td class="p-2">{{ userStore.state.users.indexOf(user) + 1 }}</td> -->
            <td class="p-2">{{ user['@id'].split('/').pop() }}</td>
            <td class="p-2">{{ user.fullName }}</td>
            <td class="p-2">{{ user.email }}</td>
            <td class="p-2">{{ user.roles.join(", ") }}</td>
            <td class="p-2 flex gap-2">
              <span
                class="mdi mdi-pencil w-8 h-8 flex justify-center items-center text-blue-400 text-xl rounded-full cursor-pointer"
                @click="editUser(user)"
              ></span>
              <button
                class="mdi mdi-delete w-8 h-8 flex justify-center items-center text-red-400 text-xl rounded-full cursor-pointer"
                @click="deleteUser(user['@id'].split('/').pop())"
                v-if="user.email !== authStore.state.user?.email"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- <Toast />
  <ConfirmDialog></ConfirmDialog> -->
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { Button, Dialog, InputText } from "primevue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import { computed, ref } from "vue";

const authStore = useAuthStore();
const userStore = useUserStore();

const confirm = useConfirm();
const toast = useToast();

userStore.fetchUsers();

// O'zgaruvchilar
const visible = ref(false);
const isEdit = ref(false);
const userData = ref({
  fullName: "",
  email: "",
  password: "",
});
let term = ref("");

function resetForm() {
  userData.value = {
    id: null,
    fullName: "",
    email: "",
    password: "",
  };

  isEdit.value = false;
}

// Cancel the user creation/editing process
function cancel() {
  visible.value = false;
  resetForm();
}

async function saveUser() {
  try {
    if (isEdit.value) {
      await userStore.updateUser(userData.value.id, {
        fullName: userData.value.fullName,
        email: userData.value.email,
      });

      toast.add({
        severity: "success",
        summary: "Updated",
        detail: "User updated successfully",
        life: 3000,
      });
    } else {
      await userStore.createUser({
        fullName: userData.value.fullName,
        email: userData.value.email,
        password: userData.value.password,
      });

      toast.add({
        severity: "success",
        summary: "Created",
        detail: "User created successfully",
        life: 3000,
      });
    }

    cancel();
    userStore.fetchUsers();
  } catch (error) {
    console.log(error);

    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Something went wrong",
      life: 3000,
    });
  }
}

function editUser(user) {
  isEdit.value = true;

  userData.value = {
    id: user["@id"].split("/").pop(),
    fullName: user.fullName,
    email: user.email,
    password: "",
  };

  visible.value = true;
}

const deleteUser = (userId) => {
  confirm.require({
    message: "Do you want to delete this record?",
    header: "Danger Zone",
    icon: "pi pi-info-circle",

    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },

    acceptProps: {
      label: "Delete",
      severity: "danger",
    },

    accept: async () => {
      await userStore.deleteUser(userId);

      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Record deleted",
        life: 3000,
      });
    },

    reject: () => {
      toast.add({
        severity: "warn",
        summary: "Cancelled",
        detail: "Delete cancelled",
        life: 3000,
      });
    },
  });
};

const filteredUsers = computed(() => {
  return userStore.state.users.filter((user) => {
    return (
      user.fullName.toLowerCase().includes(term.value.toLowerCase()) ||
      user.email.toLowerCase().includes(term.value.toLowerCase())
    );
  });
});
</script>

<style scoped></style>
