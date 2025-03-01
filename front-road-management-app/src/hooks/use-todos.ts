import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getTodos,
  getTodosByRoadId,
  createTodo,
  updateTodo,
} from '../api/todos'
import type { TTodoFormData } from '../types/todo'

export const useTodos = (roadId?: number) => {
  const queryClient = useQueryClient()

  const { data: todos = [] } = useQuery({
    queryKey: ['todos', roadId],
    queryFn: () => (roadId ? getTodosByRoadId(roadId) : getTodos()),
  })

  const createMutation = useMutation({
    mutationFn: (data: TTodoFormData) => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TTodoFormData }) =>
      updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return {
    todos,
    isLoading: createMutation.isPending || updateMutation.isPending,
    createTodo: createMutation.mutate,
    updateTodo: updateMutation.mutate,
  }
}
