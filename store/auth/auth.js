// stores/authStore.js
import { defineStore } from 'pinia'
import { apiCall } from '~/utils/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),

  actions: {
    async login({email, password}) {

      try {
        const response = await apiCall({'route': 'login', data: { email, password }, 'method': 'POST'})

        this.user = response.data?.user
        this.token = response.data?.token

        localStorage.setItem('auth_token', this.token)
        navigateTo('/dashboard');
      } catch (error) {
        throw (error || 'Login failed')
      }
    },

    async register({ email, password, name, password_confirmation }) {
      try {
        const response = await apiCall({'route': 'register', data: { email, password, name, password_confirmation }, 'method': 'POST'})

        this.user = response.data?.user
        navigateTo('/?showMessage=true')
      } catch (error) {
        throw (error || 'Login failed')      
      }
    },

    async logout() {

      try {
        await apiCall({'route': 'logout', 'method': 'POST', 'token': this.token ?? localStorage.getItem('auth_token')})

        this.user = null
        this.token = null
        localStorage.removeItem('auth_token')

      } catch (error) {
        console.log(error)
      }

      navigateTo('/')
    }
  },
  persist: true,
})
