import { type FC, useEffect } from 'react'
import type { TTodo, TTodoFormData } from '../types/todo'
import { TTodoFormData as todoFormSchema } from '../types/todo'
import type { TRoadFeature } from '../types/roads'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type TTodoFormProps = {
  todo?: TTodo
  selectedRoad?: TRoadFeature | null
  onSubmit: (data: TTodoFormData) => Promise<void>
  onCancel: () => void
}

export const TodoForm: FC<TTodoFormProps> = ({
  todo,
  selectedRoad,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TTodoFormData>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: todo?.title ?? '',
      description: todo?.description ?? '',
      author: todo?.author ?? '',
      status: todo?.status ?? 'In Planung',
      road_fid: todo?.road_fid ?? selectedRoad?.properties.fid ?? 0,
    },
  })

  useEffect(() => {
    reset({
      title: todo?.title ?? '',
      description: todo?.description ?? '',
      author: todo?.author ?? '',
      status: todo?.status ?? 'In Planung',
      road_fid: todo?.road_fid ?? selectedRoad?.properties.fid ?? 0,
    })
  }, [todo, selectedRoad, reset])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col gap-2 overflow-y-auto p-5"
    >
      <h3 className="text-right text-lg font-medium">
        Todo {todo ? 'Bearbeiten' : 'Erstellen'}
      </h3>
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Titel
        </label>
        <input
          id="title"
          type="text"
          className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none transition-colors ${
            errors.title
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }`}
          {...register('title')}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Beschreibung
        </label>
        <textarea
          id="description"
          rows={3}
          className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none transition-colors ${
            errors.description
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }`}
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="author"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Author Email
        </label>
        <input
          id="author"
          type="email"
          className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none transition-colors ${
            errors.author
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }`}
          {...register('author')}
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-500">{errors.author.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500"
          {...register('status')}
        >
          <option value="In Planung">In Planung</option>
          <option value="In Bearbeitung">In Bearbeitung</option>
          <option value="Abgeschlossen">Abgeschlossen</option>
        </select>
      </div>

      <input type="hidden" {...register('road_fid')} />

      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {todo ? 'Aktualisieren' : 'Erstellen'}
        </button>
      </div>
    </form>
  )
}
