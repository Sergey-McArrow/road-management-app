import { z } from 'zod'

export const TGradeStats = z.object({
  name: z.string(),
  average: z.number(),
  min: z.number(),
  max: z.number(),
})

export type TGradeStats = z.infer<typeof TGradeStats>

export const TStatisticsSidebarProps = z.object({
  roads: z.any().optional(),
})

export type TStatisticsSidebarProps = z.infer<typeof TStatisticsSidebarProps>
