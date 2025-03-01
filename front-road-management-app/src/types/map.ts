import { z } from 'zod'

export const TMapPosition = z.object({
  lat: z.number(),
  lng: z.number(),
  zoom: z.number(),
})

export type TMapPosition = z.infer<typeof TMapPosition>

export const TMarker = z.object({
  position: z.tuple([z.number(), z.number()]),
  popup: z.string(),
})

export type TMarker = z.infer<typeof TMarker>
