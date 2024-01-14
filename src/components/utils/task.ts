import { Task, Status } from '../constants/types'

export const getTasksByStatus = (tasks: Task[], status: any) => {
  return tasks.filter((task) => task.status.id.toString() === status)
}

export const getTaskById = (tasks: Task[], id: string) => {
  return tasks.find((task) => task.id === id)
}
