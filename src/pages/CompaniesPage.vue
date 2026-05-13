<template>
  <div class="flex flex-col gap-5 w-full">
    <div
      class="p-5 bg-white rounded-lg shadow-md flex items-center gap-2 justify-between"
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        class="w-100 p-2 border border-gray-300 rounded-md"
        v-model="term"
      />
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 text-nowrap cursor-pointer"
        @click="visible = true"
      >
        Kompaniya qo'shish 
      </button>
    </div>
    <div class="p-5 bg-white shadow-md rounded-lg">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-b-gray-300">
            <th class="text-left p-2">ID</th>
            <th class="text-left p-2">Kompaniya nomi</th>
            <th class="text-left p-2">Telefon</th>
            <th class="text-left p-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="company in filteredCompanies" :key="company['@id']">
            <tr
              @click="toggleCompany(company['@id'])"
              class="border-b border-b-gray-300 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
            >
              <td class="p-2">{{ company["@id"].split("/").pop() }}</td>
              <td class="p-2">{{ company.name }}</td>
              <td class="p-2">{{ company.phone }}</td>

              <td class="p-2 flex gap-2">
                <span
                  class="mdi mdi-pencil w-8 h-8 flex justify-center items-center text-blue-400 text-xl rounded-full cursor-pointer"
                  @click.stop="editCompany(company)"
                ></span>

                <span
                  @click.stop="
                    deleteCompany(company['@id'].split('/').pop(), userId)
                  "
                  class="mdi mdi-delete w-8 h-8 flex justify-center items-center text-red-400 text-xl rounded-full cursor-pointer"
                ></span>
              </td>
            </tr>

            <tr v-if="customerData.company === company['@id']">
              <td colspan="4" class="bg-gray-50 p-4">
                <div>
                  <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-600 mb-2">
                      Mijozlar:
                    </h3>
                    <button
                      @click="visible2 = true"
                      class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                      Mijoz qo'shish
                    </button>
                  </div>

                  <ul class="list-disc list-inside">
                    <li
                      v-for="customer in company.customers"
                      :key="customer.id"
                      class="group flex items-center gap-5 border-b border-gray-200 py-2 "
                    >
                      <span class=" min-w-xs">{{ customer.fullName }}</span>
                      <span class=" min-w-2xs">{{ customer.email }}</span>
                      <span class="">{{ customer.phone }}</span>
                      
                      <span
                        class="mdi mdi-pencil w-6 h-6 hidden group-hover:flex justify-center items-center text-blue-400 text-lg rounded-full cursor-pointer ml-2"
                        @click.stop="
                          editCustomer(customer);
                        "
                      ></span>
                      <span
                        class="mdi mdi-delete w-6 h-6 hidden group-hover:flex justify-center items-center text-red-400 text-lg rounded-full cursor-pointer"
                        @click.stop="
                          deleteCustomer(
                            customer['@id'].split('/').pop(),
                            userId,
                          );
                        "
                      ></span>
                    </li>
                  </ul>
                </div>

                <!-- <div v-else class="text-gray-400">Mijozlar mavjud emas</div> -->
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    :header="isEdit ? 'Kompaniya tahrirlash' : 'Kompaniya qo‘shish'"
    :style="{ width: '25rem' }"
  >
    <!-- <span class="text-gray-500 dark:text-gray-400 block mb-8"
          >Yangi foydalanuvchi qo'shish</span
        > -->
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
    <div class="flex items-center gap-4 mb-8">
      <label for="phone" class="font-semibold w-24 text-gray-500">
        Telefon
      </label>

      <InputText
        id="phone"
        v-model="companyData.phone"
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

  <!-- Customer dialog -->
  <Dialog
    v-model:visible="visible2"
    modal
    :header="isEdit2 ? 'Mijoz tahrirlash' : 'Mijoz qo‘shish'"
    :style="{ width: '25rem' }"
  >
    <!-- <span class="text-gray-500 dark:text-gray-400 block mb-8"
          >Yangi foydalanuvchi qo'shish</span
        > -->
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24 text-gray-500"
        >Mijoz nomi</label
      >
      <InputText
        id="name"
        v-model="customerData.fullName"
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
        v-model="customerData.email"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="phone" class="font-semibold w-24 text-gray-500">
        Telefon
      </label>

      <InputText
        id="phone"
        v-model="customerData.phone"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="cancel2"
      ></Button>
      <Button
        type="submit"
        :label="isEdit2 ? 'Update' : 'Save'"
        @click="saveCustomer"
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

// O'zgaruvchilar
const userId = computed(() => authStore.state.user?.id);
const visible = ref(false);
const visible2 = ref(false);
const isEdit = ref(false);
const isEdit2 = ref(false);
// const openedCompany = ref(null);
const companyData = ref({
  name: "",
  phone: "",
});
const customerData = ref({
  fullName: "",
  email: "",
  phone: "",
  company: null,
});
let term = ref("");

function toggleCompany(companyId) {
  if (customerData.value.company === companyId) {
    customerData.value.company = null;
  } else {
    customerData.value.company = companyId;
  }
}

function resetForm() {
  companyData.value = {
    name: "",
    phone: "",
    user: `/api/users/${userId.value}`,
  };

  isEdit.value = false;
}
function resetForm2() {
  customerData.value = {
    fullName: "",
    email: "",
    phone: "",
    company: null,
  };

  isEdit2.value = false;
}

// Cancel the company creation/editing process
function cancel() {
  visible.value = false;
  resetForm();
}
function cancel2() {
  visible2.value = false;
  resetForm2();
}

async function saveCompany() {
  try {
    if (isEdit.value) {
      await companyStore.updateMyCompany(
        companyData.value.id,
        {
          name: companyData.value.name,
          phone: companyData.value.phone,
          user: `/api/users/${userId.value}`,
        },
      );

      toast.add({
        severity: "success",
        summary: "Updated",
        detail: "User updated successfully",
        life: 3000,
      });
    } else {
      await companyStore.createMyCompany(
        {
          name: companyData.value.name,
          phone: companyData.value.phone,
          user: `/api/users/${userId.value}`,
        },
      );

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

async function saveCustomer() {
  try {
    if (isEdit2.value) {
      await companyStore.editCustomer(
        customerData.value.id,
        {
          fullName: customerData.value.fullName,
          email: customerData.value.email,
          phone: customerData.value.phone,
          company: customerData.value.company,
        },
      );

      toast.add({
        severity: "success",
        summary: "Updated",
        detail: "Customer updated successfully",
        life: 3000,
      });
    } else {
      await companyStore.createCustomer(
        {
          fullName: customerData.value.fullName,
          email: customerData.value.email,
          phone: customerData.value.phone,
          company: customerData.value.company,
        },
      );

      toast.add({
        severity: "success",
        summary: "Created",
        detail: "Customer created successfully",
        life: 3000,
      });
    }

    cancel2();
    companyStore.fetchMyCompanies(userId.value);
    // toggleCompany(customerData.value.company);
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
    phone: company.phone,
    user: `/api/users/${userId.value}`,
    
  };

  visible.value = true;
}
function editCustomer(customer) {
  isEdit2.value = true;
  console.log(customer);
  customerData.value = {
    id: customer["@id"].split("/").pop(),
    fullName: customer.fullName,
    email: customer.email,
    phone: customer.phone,
    company: customer.company,
  };

  visible2.value = true;
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

const deleteCustomer = (customerId, userId) => {
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
      await companyStore.deleteCustomer(customerId, userId);

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
    return (
      company.name.toLowerCase().includes(term.value.toLowerCase()) ||
      company.phone.toLowerCase().includes(term.value.toLowerCase())
    );
  });
});
</script>

<style scoped></style>
