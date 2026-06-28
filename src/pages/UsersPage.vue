<template>
  <div class="flex flex-col gap-5 w-full">
    <div class="px-5 py-3 bg-white flex items-center gap-2 justify-end">
      <button
        class="bg-[#109CF1] text-white text-[13px] font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 text-nowrap cursor-pointer"
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
        :closable="false"
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

    <h4 class="text-xs">
      Foydalanuvchi:
      <span class="text-[#109CF1]"
        >Hammasi <i class="mdi mdi-menu-down -ml-1"></i
      ></span>
    </h4>

    <div class="grid grid-cols-4 gap-5">
      <div class="bg-white shadow-md flex gap-1 items-center">
        <i class="mdi mdi-magnify pl-4 text-xl text-[#C2CFE0]"></i>
        <input
          type="text"
          name="searchUser"
          id="searchUser"
          placeholder="Foydalanuvchi qidirish"
          v-model="termUser"
          class="placeholder:text-[#90A0B7] placeholder:text-xs text-xs text-[#90A0B7] p-3 flex-1 outline-none"
        />
      </div>
      <div class="bg-white shadow-md flex gap-1 items-center">
        <i class="mdi mdi-magnify pl-4 text-xl text-[#C2CFE0]"></i>
        <input
          type="text"
          name="searchEmail"
          id="searchEmail"
          placeholder="Email qidirish"
          v-model="termEmail"
          class="placeholder:text-[#90A0B7] placeholder:text-xs text-xs text-[#90A0B7] p-3 flex-1 outline-none"
        />
      </div>
      <div class="bg-white shadow-md flex gap-1 items-center">
        <i class="mdi mdi-magnify pl-4 text-xl text-[#C2CFE0]"></i>
        <input
          type="text"
          name="searchPassword"
          id="searchPassword"
          placeholder="Parol qidirish"
          v-model="termPassword"
          class="placeholder:text-[#90A0B7] placeholder:text-xs text-xs text-[#90A0B7] p-3 flex-1 outline-none"
        />
      </div>
      <div class="bg-white shadow-md flex gap-1 items-center">
        <i class="mdi mdi-magnify pl-4 text-xl text-[#C2CFE0]"></i>
        <input
          type="text"
          name="searchActivity"
          id="searchActivity"
          placeholder="So'ngi faollikni qidirish"
          v-model="termActivity"
          class="placeholder:text-[#90A0B7] placeholder:text-xs text-xs text-[#90A0B7] p-3 flex-1 outline-none"
        />
      </div>
    </div>

    <div v-if="filteredUsers.length" class="p-5 bg-white shadow-md">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-b-gray-300">
            <!-- <th class="text-left p-2">№</th> -->
            <th class="text-left p-2 w-72 text-[#334d6eb4] text-[13px]">Ism</th>
            <th class="text-left p-2 w-72 text-[#334d6eb4] text-[13px]">
              Email
            </th>
            <th class="text-left p-2 w-60 text-[#334d6eb4] text-[13px]">
              Parol
            </th>
            <th class="text-left p-2 text-[#334d6eb4] text-[13px]">
              So'ngi faollik
            </th>
            <th class="text-left p-2 text-[#334d6eb4] text-[13px]"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-b border-b-gray-300 transition-colors duration-300 last:border-b-0 group"
          >
            <!-- <td class="p-2">{{ userStore.state.users.indexOf(user) + 1 }}</td> -->
            <!-- <td class="p-2">{{ user['@id'].split('/').pop() }}</td> -->
            <td
              class="p-3 text-[15px] text-[#506072] font-medium"
              :class="{
                'text-blue-400': user.email === authStore.state.user?.email,
              }"
            >
              {{ user.fullName }}
            </td>
            <td
              class="p-3 text-[13px] text-[#707683]"
              :class="{
                'text-blue-400': user.email === authStore.state.user?.email,
              }"
            >
              {{ user.email }}
            </td>
            <td
              class="p-3 text-[13px] text-[#707683]"
              :class="{
                'text-blue-400': user.email === authStore.state.user?.email,
              }"
            >
              {{ user.password }}
            </td>
            <td
              class="p-3 text-[13px] text-[#707683]"
              :class="{
                'text-blue-400': user.email === authStore.state.user?.email,
              }"
            >
              {{ lastActivity(user.createdAt) }}
            </td>
            <td class="p-2 flex gap-3">
              <span
                class="mdi mdi-pencil text-[#2ED47A] text-xl rounded-full cursor-pointer hidden group-hover:inline-block"
                @click="editUser(user)"
              ></span>
              <button
                class="mdi mdi-delete text-red-400 text-xl rounded-full cursor-pointer hidden group-hover:inline-block"
                @click="deleteUser(user['@id'].split('/').pop())"
                v-if="user.email !== authStore.state.user?.email"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <h3 class="text-center mt-20">Malumot topilmadi!</h3>
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

let termUser = ref("");
let termEmail = ref("");
let termPassword = ref("");
let termActivity = ref("");

function resetForm() {
  userData.value = {
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

// const filteredUsers = computed(() => {
//   return userStore.state.users.filter((user) => {
//     return (
//       user.fullName.toLowerCase().includes(term.value.toLowerCase()) ||
//       user.email.toLowerCase().includes(term.value.toLowerCase())
//     );
//   });
// });

const filteredUsers = computed(() => {
  return userStore.state.users.filter((user) => {
    const matchName = user.fullName
      ?.toLowerCase()
      .includes(termUser.value.toLowerCase());

    const matchEmail = user.email
      ?.toLowerCase()
      .includes(termEmail.value.toLowerCase());

    const matchPassword = user.password
      ?.toLowerCase()
      .includes(termPassword.value.toLowerCase());

    const matchActivity = lastActivity(user.createdAt)
      ?.toLowerCase()
      .includes(termActivity.value.toLowerCase());

    return matchName && matchEmail && matchPassword && matchActivity;
  });
});

const lastActivity = (date) => {
  if (!date) return "-";

  const now = new Date();
  const past = new Date(date);

  if (isNaN(past.getTime())) return "-";

  const diffMs = now - past;

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return `${diffSec} soniya oldin`;
  if (diffMin < 60) return `${diffMin} daqiqa oldin`;
  if (diffHour < 24) return `${diffHour} soat oldin`;

  return `${diffDay} kun oldin`;
};
</script>

<style scoped></style>
