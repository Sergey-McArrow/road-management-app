import { z } from 'zod'

export const TTodoStatus = z.enum(['In Planung', 'In Bearbeitung', 'Abgeschlossen'])
export type TTodoStatus = z.infer<typeof TTodoStatus>

export const TTodo = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Titel ist erforderlich'),
  description: z.string().min(1, 'Beschreibung ist erforderlich'),
  author: z.string().email('Ungültige E-Mail-Adresse'),
  status: TTodoStatus,
  road_fid: z.number(),
})

export type TTodo = z.infer<typeof TTodo>

export const TTodoFormData = TTodo.omit({ id: true })
export type TTodoFormData = z.infer<typeof TTodoFormData>
