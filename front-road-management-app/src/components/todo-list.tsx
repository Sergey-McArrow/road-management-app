import { type FC } from 'react'
import type { TTodo } from '../types/todo'

type TTodoListProps = {
  todos: TTodo[]
  onEdit: ((todo: TTodo) => void) | null
}

export const TodoList: FC<TTodoListProps> = ({ todos, onEdit }) => {
  return (
    <div className="flex flex-col gap-4" data-testid="todo-list">
      {todos.length === 0 ? (
        <p className="text-gray-500">Keine TODOs vorhanden</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            data-testid="todo-item"
            className={`rounded border p-4 ${
              onEdit ? 'cursor-pointer hover:border-blue-500' : ''
            }`}
            onClick={() => onEdit && onEdit(todo)}
          >
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">{todo.title}</h4>
              <span
                className={`rounded px-2 py-1 text-xs font-medium ${
                  todo.status === 'In Planung'
                    ? 'bg-yellow-100 text-yellow-800'
                    : todo.status === 'In Bearbeitung'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                }`}
              >
                {todo.status}
              </span>
            </div>
            <p className="mb-2 text-sm text-gray-600">{todo.description}</p>
            <p className="text-xs text-gray-500">{todo.author}</p>
          </div>
        ))
      )}
    </div>
  )
}
