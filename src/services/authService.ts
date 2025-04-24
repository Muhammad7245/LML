// src/services/authService.ts
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

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