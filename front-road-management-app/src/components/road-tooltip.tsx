import type { FC } from 'react'
import type { TGradeType } from '../types/grades'
import { getGradeLabel } from '@/helpers'

type TRoadTooltipProps = {
  name: string
  gradeValue: number
  gradeType: TGradeType
}

export const RoadTooltip: FC<TRoadTooltipProps> = ({
  name,
  gradeValue,
  gradeType,
}) => {
  const gradeLabel = getGradeLabel(gradeType)

  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold">{name}</div>
      <div className="flex justify-between gap-2">
        <span>{gradeLabel}:</span>
        <span className="font-medium">{gradeValue.toFixed(2)}</span>
      </div>
    </div>
  )
}
