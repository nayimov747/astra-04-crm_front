import api from "@/plugins/axios";
import router from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const state = ref({
    token: localStorage.getItem("token") || null,
    user: null,
  });

  async function login(data) {
    console.log(data);
    try {
      // token olish
      const response = await api.post("/login", data);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      state.value.token = response.data.token;

      // user ma'lumotlarini olish
      const userResponse = await api.get("/me");
      state.value.user = userResponse.data;
      
      router.push("/");

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    localStorage.removeItem("token");
    state.value.user = null;
    router.push("/login");
  }

  async function fetchMe() {
    if (!state.value.token) {
      state.value.token = localStorage.getItem("token");
    }

     if (!state.value.token) return;

     const res = await api.get("/me");

     state.value.user = res.data;
  }

  return { state, login, logout, fetchMe };
});
