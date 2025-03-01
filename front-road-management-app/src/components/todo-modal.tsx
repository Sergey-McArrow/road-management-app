import { type FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { TTodoFormData as TTodoFormDataType, TTodo } from '../types/todo'
import { TTodoFormData, TTodoStatus } from '../types/todo'
import { useTodos } from '../hooks/use-todos'

type TTodoModalProps = {
  roadFid: number
  roadName: string
  todo?: TTodo
  onClose: () => void
  onSuccess: () => void
}

export const TodoModal: FC<TTodoModalProps> = ({
  roadFid,
  roadName,
  todo,
  onClose,
  onSuccess,
}) => {
  const { createTodo, updateTodo, isLoading } = useTodos()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTodoFormDataType>({
    resolver: zodResolver(TTodoFormData),
    defaultValues: todo || {
      road_fid: roadFid,
      status: 'In Planung',
    },
  })

  const onSubmit = useCallback(
    async (data: TTodoFormDataType) => {
      try {
        if (todo?.id) {
          updateTodo({ id: todo.id, data })
        } else {
          createTodo(data)
        }
        onSuccess()
        onClose()
      } catch (error) {
        console.error('Error saving todo:', error)
      }
    },
    [todo?.id, updateTodo, createTodo, onSuccess, onClose]
  )

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {todo ? 'TODO bearbeiten' : 'Neues TODO'} für {roadName}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          type="button"
        >
          ✕
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block font-medium">
            Titel
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="w-full rounded border bg-white p-2"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block font-medium">
            Beschreibung
          </label>
          <textarea
            id="description"
            {...register('description')}
            className="w-full rounded border bg-white p-2"
            rows={3}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="author" className="mb-1 block font-medium">
            Author (E-Mail)
          </label>
          <input
            id="author"
            type="email"
            {...register('author')}
            className="w-full rounded border bg-white p-2"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block font-medium">
            Status
          </label>
          <select
            id="status"
            {...register('status')}
            className="w-full rounded border bg-white p-2"
          >
            {Object.values(TTodoStatus.enum).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <input type="hidden" {...register('road_fid')} />

        <div className="mt-auto flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading
              ? 'Speichern...'
              : todo
              ? 'Aktualisieren'
              : 'Erstellen'}
          </button>
        </div>
      </form>
    </div>
  )
}
