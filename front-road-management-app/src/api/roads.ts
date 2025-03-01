import type { TRoadsFeatureCollection } from '../types/roads'
import { api } from '.'

export const getRoads = async (): Promise<TRoadsFeatureCollection> => {
  const { data } = await api.get<TRoadsFeatureCollection>('/roads')
  return data
}
