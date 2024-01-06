export type Status = 'Not Started' | 'In Progress' | 'Released'

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
