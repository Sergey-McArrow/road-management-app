import axios from 'axios'
import { env } from '../env'

if (!env.VITE_API_URL) {
  throw new Error('Missing env variable: VITE_API_URL')
}

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
