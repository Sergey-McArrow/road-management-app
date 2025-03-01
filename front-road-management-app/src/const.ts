import { Icon } from 'leaflet'
import type { TGradeType } from './types/grades'

export const defaultMapIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export const mainGradesArray = [
  'gw',
  'twgeb',
  'twofs',
  'twrio',
  'twsub',
  'tweben',
] as const

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

export const tooltipStyles = {
  container: 'background: white; padding: 8px; border-radius: 4px; min-width: 150px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);',
  title: 'font-weight: bold; margin-bottom: 4px;',
  gradeContainer: 'display: flex; justify-content: space-between;',
  gradeValue: 'font-weight: 500;',
}