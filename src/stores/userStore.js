import api from "@/plugins/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const state = ref({
    users: [],
    usersCount: 0,
  });

  async function fetchUsers() {
    try {
      const response = await api.get("/users");
      state.value.users = response.data.member;
      state.value.usersCount = response.data.totalItems;
    } catch (error) {
      throw error;
    }
  }

  async function fetchUserById(userId) {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function createUser(userData) {
    try {
      const response = await api.post("/users/create", userData);
      await fetchUsers();
      return response.data;
    } catch (error) {
      console.log('ERROR: ' + error);
      throw error;
    }
  }

  async function updateUser(userId, userData) {
    try {
      const response = await api.patch(`/users/${userId}`, userData, {
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
      });
      await fetchUsers();
      return response.data;
    } catch (error) {
      console.log('ERROR: ' + error);
      throw error;
    }
  }

  async function deleteUser(userId) {
    try {
      const response = await api.delete(`/users/${userId}`);
      await fetchUsers();
      return response.data;
    } catch (error) {
      console.log('ERROR: ' + error);
      throw error;
    }
  }

  return { state, fetchUsers, fetchUserById, createUser, updateUser, deleteUser };
});