import { useQuery } from '@tanstack/react-query'
import { getRoads } from '../api/roads'
import type { TRoadFeature } from '../types/roads'

export const useRoads = () => {
  const { data: roads = { type: 'FeatureCollection', features: [] }, isLoading, isError, error } = useQuery({
    queryKey: ['roads'],
    queryFn: getRoads,
  })

  const calculateGradeStats = () => {
    const gradeCount: Record<string, number> = {}
    roads.features.forEach((road: TRoadFeature) => {
      const grade = road.properties.eemi_grade.gw
      gradeCount[grade] = (gradeCount[grade] || 0) + 1
    })

    return Object.entries(gradeCount).map(([grade, count]) => ({
      grade,
      count,
    }))
  }

  return {
    roads,
    gradeStats: calculateGradeStats(),
    isLoading,
    isError,
    error,
  }
}
