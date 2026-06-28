<template>
  <div class="flex flex-col gap-5 w-full">
    <div class="px-5 py-3 bg-white flex items-center gap-2 justify-end">
      <button
        class="bg-[#109CF1] text-white text-[13px] font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 text-nowrap cursor-pointer"
        @click="visible = true"
      >
        Kompaniya qo'shish
      </button>
    </div>

    <h4 class="text-xs">
      Kompaniya:
      <span class="text-[#109CF1]"
        >Hammasi <i class="mdi mdi-menu-down -ml-1"></i
      ></span>
    </h4>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
      <div class="bg-white shadow-md flex gap-1 items-center">
        <i class="mdi mdi-magnify pl-4 text-xl text-[#C2CFE0]"></i>
        <input
          type="text"
          name="searchCompany"
          id="searchCompany"
          placeholder="Kompaniya qidirish"
          v-model="termCompany"
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

    <div v-if="filteredCompanies.length > 0" class="p-5 bg-white shadow-md overflow-x-auto">
      <table class="w-full border-collapse min-w-2xl ">
        <thead>
          <tr class="border-b border-b-gray-300">
            <!-- <th class="text-left p-2">ID</th> -->
            <th class="text-left p-2 w-72 text-[#334d6eb4] text-[13px]">
              Kompaniya nomi
            </th>
            <th class="text-left p-2 w-72 text-[#334d6eb4] text-[13px]">
              Email
            </th>
            <th class="text-left p-2 w-72 text-[#334d6eb4] text-[13px]">Parol</th>
            <th class="text-left p-2 text-[#334d6eb4] text-[13px]">
              So'ngi faollik
            </th>

            <th class="text-left p-2"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="company in filteredCompanies" :key="company['@id']">
            <tr
              class="border-b border-b-gray-300 hover:bg-gray-100 transition-colors duration-300 last:border-b-0 group "
            >
              <!-- <td class="p-2">{{ company["@id"].split("/").pop() }}</td> -->
              <td class="p-3 text-[15px] text-[#323C47] font-medium">
                {{ company.name }}
              </td>
              <td class="p-3 text-[13px] text-[#707683]">
                {{ company.email }}
              </td>
              <td class="p-3 text-[13px] text-[#707683]">
                {{ company.password }}
              </td>
              <td class="p-3 text-[13px] text-[#707683]">
                {{ lastActivity(company.createdAt) }}
              </td>

              <td class="p-2 flex gap-3 ">
                <span
                  class="mdi mdi-pencil text-[#2ED47A] text-xl rounded-full cursor-pointer hidden group-hover:inline-block"
                  @click.stop="editCompany(company)"
                ></span>

                <span
                  @click.stop="
                    deleteCompany(company['@id'].split('/').pop(), userId)
                  "
                  class="mdi mdi-delete text-red-400 text-xl rounded-full cursor-pointer hidden group-hover:inline-block"
                ></span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div v-else>
      <h3 class="text-center mt-20">Malumot topilmadi!</h3>
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    :header="isEdit ? 'Kompaniya tahrirlash' : 'Kompaniya qo‘shish'"
    :style="{ width: '25rem' }"
    :closable="false"
  >
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24 text-gray-500"
        >Kompaniya nomi</label
      >
      <InputText
        id="name"
        v-model="companyData.name"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24 text-gray-500">
        Email
      </label>

      <InputText
        id="email"
        v-model="companyData.email"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <div class="flex items-center gap-4 mb-8">
      <label for="password" class="font-semibold w-24 text-gray-500">
        Password
      </label>

      <InputText
      type="password"
        id="password"
        v-model="companyData.password"
        class="flex-auto"
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
        @click="saveCompany"
      />
    </div>
  </Dialog>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useCompanyStore } from "@/stores/companyStore";
import { Button, Dialog, InputText } from "primevue";
import { computed, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const companyStore = useCompanyStore();

const authStore = useAuthStore();

const confirm = useConfirm();
const toast = useToast();

const userId = computed(() => authStore.state.user?.id);
const visible = ref(false);
const isEdit = ref(false);
const companyData = ref({
  name: "",
  email: "",
  password: "",
});

let termCompany = ref("");
let termEmail = ref("");
let termPassword = ref("");
let termActivity = ref("");

function resetForm() {
  companyData.value = {
    name: "",
    email: "",
    password: "",
    user: `/api/users/${userId.value}`,
  };

  isEdit.value = false;
}

function cancel() {
  visible.value = false;
  resetForm();
}

async function saveCompany() {
  try {
    if (isEdit.value) {
      await companyStore.updateMyCompany(companyData.value.id, {
        name: companyData.value.name,
        email: companyData.value.email,
        password: companyData.value.password,
        user: `/api/users/${userId.value}`,
      });

      toast.add({
        severity: "success",
        summary: "Updated",
        detail: "User updated successfully",
        life: 3000,
      });
    } else {
      await companyStore.createMyCompany({
        name: companyData.value.name,
        email: companyData.value.email,
        password: companyData.value.password,
        user: `/api/users/${userId.value}`,
      });

      toast.add({
        severity: "success",
        summary: "Created",
        detail: "User created successfully",
        life: 3000,
      });
    }

    cancel();
    companyStore.fetchMyCompanies(userId.value);
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

function editCompany(company) {
  isEdit.value = true;
  console.log(company);
  companyData.value = {
    id: company["@id"].split("/").pop(),
    name: company.name,
    email: company.email,
    password: company.password,
    user: `/api/users/${userId.value}`,
  };

  visible.value = true;
}


const deleteCompany = (companyId, userId) => {
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
      await companyStore.deleteMyCompany(companyId, userId);

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



const filteredCompanies = computed(() => {
  return companyStore.state.myCompanies.filter((company) => {
    const matchName = company.name
      ?.toLowerCase()
      .includes(termCompany.value.toLowerCase());

    const matchEmail = company.email
      ?.toLowerCase()
      .includes(termEmail.value.toLowerCase());

    const matchPassword = company.password
      ?.toLowerCase()
      .includes(termPassword.value.toLowerCase());

    const matchActivity = lastActivity(company.createdAt)
      ?.toLowerCase()
      .includes(termActivity.value.toLowerCase());

    return matchName && matchEmail && matchPassword && matchActivity;
  });
});

function lastActivity(date) {
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
}
</script>

<style scoped></style>
