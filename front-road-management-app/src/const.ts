import { Icon } from 'leaflet'

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



export const tooltipStyles = {
  container:
    'background: white; padding: 8px; border-radius: 4px; min-width: 150px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);',
  title: 'font-weight: bold; margin-bottom: 4px;',
  gradeContainer: 'display: flex; justify-content: space-between;',
  gradeValue: 'font-weight: 500;',
}

export const legendItems = [
  { range: '1.00 - 1.49', color: '#3388ff' },
  { range: '1.50 - 2.49', color: '#90EE90' },
  { range: '2.50 - 3.49', color: '#006400' },
  { range: '3.50 - 4.49', color: '#FFFF00' },
  { range: '4.50 - 5.00', color: '#FF0000' },
]
