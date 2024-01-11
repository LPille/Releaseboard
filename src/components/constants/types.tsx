export type Status = 1 | 2 | 3

export const STATUS = {
  NOT_STARTED: 'Not started',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}


export type Filter = { type: number; name: string; active: boolean; color: string }

export type Task = {
  id: string
  title: string
  description: string
  status: Status
  platform: string
}

export type BoardSections = {
  [name: string]: Task[]
}
