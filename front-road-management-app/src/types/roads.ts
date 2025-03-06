import { z } from 'zod'
import type { Feature, FeatureCollection, LineString } from 'geojson'

export const TEemiArea = z.object({
  area_rel: z.number(),
})

export const TEemiGrade = z.object({
  gw: z.number(),
  twgeb: z.number(),
  twofs: z.number(),
  twrio: z.number(),
  twsub: z.number(),
  tweben: z.number(),
  sub_type_grades: z.record(z.string(), z.number()),
})

export const TRoadProperties = z.object({
  fid: z.number(),
  idsec: z.number(),
  evnk: z.string(),
  ennk: z.string(),
  len: z.number(),
  name: z.string(),
  eemi_area: z.record(
    z.string(),
    z.record(z.string(), z.object({ area_rel: z.number() }))
  ),
  eemi_grade: TEemiGrade,
})

export type TRoadFeature = Feature<LineString, z.infer<typeof TRoadProperties>>
export type TRoadsFeatureCollection = FeatureCollection<
  LineString,
  z.infer<typeof TRoadProperties>
>
