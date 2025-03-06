import { useMap } from 'react-leaflet'
import type { TGradeType } from '../types/grades'
import { gradeTypeLabels } from '../types/grades'
import { useCallback } from 'react'

type TGradeSelectorProps = {
  selectedGrade: TGradeType
  onGradeChange: (grade: TGradeType) => void
}

export const GradeSelector = ({
  selectedGrade,
  onGradeChange,
}: TGradeSelectorProps) => {
  const map = useMap()

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onGradeChange(event.target.value as TGradeType)
      map.invalidateSize()
    },
    [onGradeChange, map]
  )

  return (
    <div className="absolute right-4 top-4 z-[1000] rounded bg-white shadow-md">
      <select
        value={selectedGrade}
        onChange={handleChange}
        className="rounded border border-gray-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Object.entries(gradeTypeLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
