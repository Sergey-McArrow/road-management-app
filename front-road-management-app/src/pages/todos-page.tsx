import { type FC } from 'react'
import { useTodos } from '../hooks/use-todos'

export const TodosPage: FC = () => {
  const { todos } = useTodos()

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">TODOs Übersicht</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b px-4 py-2 text-left font-medium text-gray-900">
                Titel
              </th>
              <th className="border-b px-4 py-2 text-left font-medium text-gray-900">
                Beschreibung
              </th>
              <th className="border-b px-4 py-2 text-left font-medium text-gray-900">
                Author
              </th>
              <th className="border-b px-4 py-2 text-left font-medium text-gray-900">
                Status
              </th>
              <th className="border-b px-4 py-2 text-left font-medium text-gray-900">
                Straße ID
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="px-4 py-2 text-gray-900">{todo.title}</td>
                <td className="px-4 py-2 text-gray-900">{todo.description}</td>
                <td className="px-4 py-2 text-gray-900">{todo.author}</td>
                <td className="px-4 py-2 text-gray-900">{todo.status}</td>
                <td className="px-4 py-2 text-gray-900">{todo.road_fid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
