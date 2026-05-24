// src/services/authService.ts
import axios from 'axios'

<<<<<<< HEAD
const API_URL = 'https://lm-backend-s43w.onrender.com/api'
=======
const API_URL = 'https://lm-backend-s43w.onrender.com/api'
>>>>>>> 53e14e92a1fbf78358552d4133482662faac7c05

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
