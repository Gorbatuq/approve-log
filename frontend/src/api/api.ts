import axios from 'axios'

export const api = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  const isAuthRoute =
    config.url?.startsWith('/auth/register') ||
    config.url?.startsWith('/auth/login')

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})


