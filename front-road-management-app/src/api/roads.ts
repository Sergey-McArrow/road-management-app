import type { TRoadsFeatureCollection } from '../types/roads'
import { api } from '.'

export const getRoads = async (): Promise<TRoadsFeatureCollection> => {
  try {
    const { data } = await api.get<TRoadsFeatureCollection>('/roads')
    return data
  } catch (error) {
    console.error('Error fetching roads:', error)
    return { type: 'FeatureCollection', features: [] }
  }
}
