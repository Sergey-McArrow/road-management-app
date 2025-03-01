import { z } from 'zod'

declare global {
  interface Window {
    ENV?: {
      VITE_API_URL: string
    }
  }
}

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
})

const processEnv = {
  VITE_API_URL: window.ENV?.VITE_API_URL || import.meta.env.VITE_API_URL,
}

export const env = envSchema.parse(processEnv)
