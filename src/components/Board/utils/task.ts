import { Task, Status } from '../types'

export const getTasksByStatus = (tasks: Task[], status: string) => {
  return tasks.filter((task) => task.status.toString() === status)
}

export const getTaskById = (tasks: Task[], id: string) => {
  return tasks.find((task) => task.id === id)
}
