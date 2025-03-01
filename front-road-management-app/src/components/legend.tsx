import { useMap } from 'react-leaflet'
import { useCallback } from 'react'

const legendItems = [
  { range: '1.00 - 1.49', color: '#3388ff' },
  { range: '1.50 - 2.49', color: '#90EE90' },
  { range: '2.50 - 3.49', color: '#006400' },
  { range: '3.50 - 4.49', color: '#FFFF00' },
  { range: '4.50 - 5.00', color: '#FF0000' },
]

export const Legend = () => {
  const map = useMap()

  const handleMouseEnter = useCallback(() => {
    map.dragging.disable()
    map.scrollWheelZoom.disable()
  }, [map])

  const handleMouseLeave = useCallback(() => {
    map.dragging.enable()
    map.scrollWheelZoom.enable()
  }, [map])

  return (
    <div
      className="absolute bottom-5 right-4 z-[1000] rounded bg-white p-3 shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mb-2 font-bold">Besoldungsgruppen:</div>
      {legendItems.map(({ range, color }) => (
        <div key={range} className="mb-1 flex items-center gap-2">
          <div
            className="h-[3px] w-5 border border-black border-opacity-20"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm">{range}</span>
        </div>
      ))}
    </div>
  )
}
