import { type FC } from 'react'
import { useRoads } from '../hooks/use-roads'

export const RoadsPage: FC = () => {
  const { roads } = useRoads()

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Straßen Übersicht</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b px-4 py-2 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="border-b px-4 py-2 text-left font-medium text-gray-900">
                ID
              </th>
              <th className="border-b px-4 py-2 text-left font-medium text-gray-900">
                Von
              </th>
              <th className="border-b px-4 py-2 text-left font-medium text-gray-900">
                Nach
              </th>
              <th className="border-b px-4 py-2 text-right font-medium text-gray-900">
                Läng
              </th>
              <th className="border-b px-4 py-2 text-right font-medium text-gray-900">
                Gesamtwert
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {roads.features.map((road) => (
              <tr key={road.properties.fid}>
                <td className="px-4 py-2 text-gray-900">
                  {road.properties.name}
                </td>
                <td className="px-4 py-2 text-gray-900">
                  {road.properties.fid}
                </td>
                <td className="px-4 py-2 text-gray-900">
                  {road.properties.evnk}
                </td>
                <td className="px-4 py-2 text-gray-900">
                  {road.properties.ennk}
                </td>
                <td className="px-4 py-2 text-right text-gray-900">
                  {road.properties.len}
                </td>
                <td className="px-4 py-2 text-right text-gray-900">
                  {road.properties.eemi_grade.gw.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
