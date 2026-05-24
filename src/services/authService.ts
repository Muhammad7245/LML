// src/services/authService.ts
import axios from 'axios'

const API_URL = 'https://lm-backend-s43w.onrender.com/api'

export const registerUser = async (userData: {
  name: string
  email: string
  password: string
}) => {
  const response = await axios.post(`${API_URL}/register`, userData)
  return response.data
}


export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password })
  return response.data
}