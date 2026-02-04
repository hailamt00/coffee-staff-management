import axios from 'axios'
import { store } from '@/app/store'
import { logout} from '@/features/auth/slices/authSlice'
import { API_CONFIG } from '../constants/api'

const apiClient = axios.create({
  baseURL: 'http://localhost:5136/api',
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout())
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
