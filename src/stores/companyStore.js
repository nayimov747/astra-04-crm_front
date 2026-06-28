import api from "@/plugins/axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCompanyStore = defineStore("company", () => {
  const state = ref({
    myCompanies: [],
    myCompaniesCount: 0,
  });

  // Getters
  // const getMyCustomers = computed(() => {
  //   let customers = [];
  //   state.value.myCompanies.forEach((company) => {
  //     customers = customers.concat(company.customers);
  //   });
  //   return customers;
  // });

  const getMyCustomers = computed(() => {
    return state.value.myCompanies.flatMap((company) =>
      company.customers.map((customer) => ({
        ...customer,
        companyId: company['@id'],
        company
      })),
    );
  });

  const getMyCustomersCount = computed(() => {
    let count = 0;

    state.value.myCompanies.forEach((company) => {
      count += company.customers.length;
    });

    return count;
  });

  // async function fetchCompanies() {
  //   try {
  //     const response = await api.get("/companies");
  //     state.value.companies = response.data.member;
  //     state.value.companiesCount = response.data.totalItems;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async function fetchMyCompanies(userId) {
    try {
      const response = await api.get(`/companies/by-user`, {
        params: {
          userId,
        },
      });
      state.value.myCompanies = response.data.member;
      state.value.myCompaniesCount = response.data.totalItems;
    } catch (error) {
      throw error;
    }
  }

  async function createMyCompany(companyData) {
    try {
      const response = await api.post("/companies", companyData);
      return response.data;
    } catch (error) {
      console.log("ERROR: " + error);
      throw error;
    }
  }

  async function updateMyCompany(companyId, companyData) {
    try {
      const response = await api.patch(`/companies/${companyId}`, companyData, {
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
      });
      return response.data;
    } catch (error) {
      console.log("ERROR: " + error);
      throw error;
    }
  }

  async function deleteMyCompany(companyId, userId) {
    try {
      const response = await api.delete(`/companies/${companyId}`);
      await fetchMyCompanies(userId);
      return response.data;
    } catch (error) {
      console.log("ERROR: " + error);
      throw error;
    }
  }

  async function createCustomer(customerData) {
    try {
      const response = await api.post("/customers", customerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function editCustomer(customerId, customerData) {
    try {
      const response = await api.patch(
        `/customers/${customerId}`,
        customerData,
        {
          headers: {
            "Content-Type": "application/merge-patch+json",
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function deleteCustomer(customerId, userId) {
    try {
      const response = await api.delete(`/customers/${customerId}`);
      await fetchMyCompanies(userId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  return {
    state,
    getMyCustomers,
    getMyCustomersCount,
    fetchMyCompanies,
    createMyCompany,
    updateMyCompany,
    deleteMyCompany,
    createCustomer,
    editCustomer,
    deleteCustomer,
  };
});
