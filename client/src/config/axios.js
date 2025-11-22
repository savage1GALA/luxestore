import axios from 'axios'
import { API_BASE_URL } from './api'

// Create axios instance with baseURL configured
const apiClient = axios.create({
  baseURL: API_BASE_URL || '',
})

export default apiClient

