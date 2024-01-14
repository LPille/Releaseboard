export interface Status {
  id: number
  name: string
}

export interface Platform {
  id: number
  name: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: Status
  platform: Platform
}
