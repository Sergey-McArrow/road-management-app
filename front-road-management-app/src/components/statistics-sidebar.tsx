import { type FC, useMemo } from 'react'
import type { TRoadFeature } from '../types/roads'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { mainGradesArray, getGradeLabel } from '../const'
import type { TStatisticsSidebarProps } from '../types/statistics'

export const StatisticsSidebar: FC<TStatisticsSidebarProps> = ({ roads }) => {
  const gradeStats = useMemo(() => {
    if (!roads?.features.length) return []

    return mainGradesArray.map((grade) => {
      const values = roads.features.map(
        (feature: TRoadFeature) => feature.properties.eemi_grade[grade]
      )
      const average =
        values.reduce((acc: number, val: number) => acc + val, 0) /
        values.length
      const min = Math.min(...values)
      const max = Math.max(...values)

      return {
        name: getGradeLabel(grade),
        average,
        min,
        max,
      }
    })
  }, [roads])

  if (!roads) return null

  return (
    <div className="flex w-80 flex-col gap-4 overflow-x-hidden bg-white p-4 shadow-lg">
      <h2 className="text-lg font-semibold">Straßen Statistiken</h2>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Durchschnittliche Besoldungsgruppen</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
                fontSize={12}
              />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="average" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Besoldungsbereiche</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Besoldungsgruppe</th>
                <th className="py-2 text-right">Min</th>
                <th className="py-2 text-right">Durchschnitt</th>
                <th className="py-2 text-right">Max</th>
              </tr>
            </thead>
            <tbody>
              {gradeStats.map((stat) => (
                <tr key={stat.name} className="border-b">
                  <td className="py-2">{stat.name}</td>
                  <td className="py-2 text-right">{stat.min.toFixed(2)}</td>
                  <td className="py-2 text-right">{stat.average.toFixed(2)}</td>
                  <td className="py-2 text-right">{stat.max.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Zusammenfassung</h3>
        <div className="rounded-md bg-neutral-50 p-3">
          <div className="flex justify-between">
            <span>Gesamtzahl der Straßen:</span>
            <span className="font-medium">{roads.features.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Gesamtlänge:</span>
            <span className="font-medium">
              {roads.features
                .reduce(
                  (acc: number, road: TRoadFeature) =>
                    acc + road.properties.len,
                  0
                )
                .toFixed(0)}
              m
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
