import { TRoadsFeatureCollection } from './types/roads'
import type { TGradeType } from './types/grades'

export const calculateGradeRanges = (roads: TRoadsFeatureCollection) => {
  const ranges: Record<string, { min: number; avg: number; max: number }> = {}

  roads.features.forEach((road) => {
    const grade = road.properties.eemi_grade.gw
    if (!ranges[grade]) {
      ranges[grade] = { min: Infinity, avg: 0, max: -Infinity }
    }
    const length = road.properties.len / 1000
    ranges[grade].min = Math.min(ranges[grade].min, length)
    ranges[grade].max = Math.max(ranges[grade].max, length)
    ranges[grade].avg = (ranges[grade].min + ranges[grade].max) / 2
  })

  return Object.entries(ranges).map(([grade, stats]) => ({
    grade,
    ...stats,
  }))
}

export const getGradeLabel = (grade: TGradeType): string => {
  switch (grade) {
    case 'gw':
      return 'Overall Grade'
    case 'twgeb':
      return 'Building Grade'
    case 'twofs':
      return 'Surface Grade'
    case 'twrio':
      return 'RIO Grade'
    case 'twsub':
      return 'Substrate Grade'
    case 'tweben':
      return 'Level Grade'
    default:
      return grade
  }
}
