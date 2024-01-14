//export type Status = 1 | 2 | 3
export type STATUS = { NOT_STARTED: 'Not started' } | { IN_PROGRESS: 'In Progress' } | { DONE: 'Done' }

export type Status = { id: 1; name: 'Not started' } | { id: 2; name: 'In Progress' } | { id: 3; name: 'Done' }

export type Filter = {
  type: number
  name: string
  active: boolean
  color: string
}

export type Platform = { id: number; name: string }

export type Task = {
  id: string
  title: string
  description: string
  status: Status
  platform: Platform
}

export type BoardSections = {
  [name: string]: Task[]
}
