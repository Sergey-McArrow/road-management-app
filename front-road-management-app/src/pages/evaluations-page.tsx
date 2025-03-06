import { type FC } from 'react'
import { useRoads } from '../hooks/use-roads'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { calculateGradeRanges } from '@/helpers'
import { Loading } from '@/ui/loading'
import { Error } from '@/ui/error'

export const EvaluationsPage: FC = () => {
  const { roads, gradeStats, isLoading, isError } = useRoads()

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error>Fehler beim Laden der Bewertungen</Error>
  }

  const gradeRanges = calculateGradeRanges(roads)

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Auswertungen</h1>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">
          Durchschnittliche Besoldungsgruppen
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Anzahl" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Besoldungsbereiche</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-4 py-2 text-left font-medium text-gray-900">
                  Besoldungsgruppe
                </th>
                <th className="border-b px-4 py-2 text-right font-medium text-gray-900">
                  Min (km)
                </th>
                <th className="border-b px-4 py-2 text-right font-medium text-gray-900">
                  Durchschnitt (km)
                </th>
                <th className="border-b px-4 py-2 text-right font-medium text-gray-900">
                  Max (km)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {gradeRanges.map((range) => (
                <tr key={range.grade}>
                  <td className="px-4 py-2 text-gray-900">{range.grade}</td>
                  <td className="px-4 py-2 text-right text-gray-900">
                    {range.min.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-900">
                    {range.avg.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-900">
                    {range.max.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
