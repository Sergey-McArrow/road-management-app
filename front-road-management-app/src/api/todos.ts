import type { TTodo, TTodoFormData } from '../types/todo'
import { api } from '.'

export const getTodos = async (): Promise<TTodo[]> => {
  try {
    const response = await api.get<TTodo[]>('/todos')
    return response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
    return []
  }
}

export const getTodosByRoadId = async (roadId: number): Promise<TTodo[]> => {
  try {
    const response = await api.get<TTodo[]>(`/todos?road_fid=${roadId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching todos by road:', error)
    return []
  }
}

export const createTodo = async (
  data: TTodoFormData
): Promise<TTodo | null> => {
  try {
    const response = await api.post<TTodo>('/todos', data)
    return response.data
  } catch (error) {
    console.error('Error creating todo:', error)
    return null
  }
}

export const updateTodo = async (
  id: number,
  data: TTodoFormData
): Promise<TTodo | null> => {
  try {
    const response = await api.put<TTodo>(`/todos/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating todo:', error)
    return null
  }
}
