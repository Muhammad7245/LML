import { defineStore } from 'pinia'
import { loginUser } from '@/services/authService'
import { registerUser } from '@/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    error: '',
    token: '',
    user: null as null | { id: string; name: string; email: string ; role: string }, // ✅ Add user object
  }),
  actions: {
    async register(name: string, email: string, password: string): Promise<boolean> {
      this.loading = true
      this.error = ''
      try {
        await registerUser({ name, email, password })
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Registration failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async login(email: string, password: string): Promise<boolean> {
      if (!email || !password) {
        this.error = 'Please enter both email and password'
        return false
      }

      this.loading = true
      this.error = ''
      try {
        const response = await loginUser(email, password)
        this.token = response.token
        this.user = response.user // ✅ Save user object
        localStorage.setItem('auth_token', this.token)
        localStorage.setItem('auth_user', JSON.stringify(this.user)) // optional: persist
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Login failed'
        return false
      } finally {
        this.loading = false
      }
    },
    loadAuth() {
      const token = localStorage.getItem('auth_token')
      const user = localStorage.getItem('auth_user')
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
      }
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    },
  },
})
