import api from "@/plugins/axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCompanyStore = defineStore("company", () => {
  const state = ref({
    myCompanies: [],
    myCompaniesCount: 0,
  });

  const getMyCustomers = computed(() => {
    let customers = [];
    state.value.myCompanies.forEach((company) => {
      customers = customers.concat(company.customers);
    });
    return customers;
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

  return { state, fetchMyCompanies, getMyCustomers, getMyCustomersCount };
});
