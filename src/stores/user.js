export const useUserStore = defineStore('user', () => {
  const state = ref({
    isAuthenticated: false,
    user: null,
  })

  const actions = {
    login(userData) {
      state.value.isAuthenticated = true
      state.value.user = userData
    },
    logout() {
      state.value.isAuthenticated = false
      state.value.user = null
    }
  }

  return { ...toRefs(state), ...actions }
})