import axios from 'axios'
import { env } from '../env'

const API_URL = env.VITE_API_URL
if (!API_URL) {
  throw new Error('Missing env variable: VITE_API_URL')
}

export const api = axios.create({
  baseURL: API_URL,
})
