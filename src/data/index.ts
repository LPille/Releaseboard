import { v4 as uuidv4 } from 'uuid'

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

export const INITIAL_TASKS: Task[] = [
  {
    id: uuidv4(),
    title: 'Recording helper finding position  based on video assets: subs, logo, panels',
    description: 'Desc 2',
    status: 'Not Started',
    platform: 'mobile',
  },
  {
    id: uuidv4(),
    title: 'Zoom',
    description: 'Desc 3',
    status: 'Not Started',
    platform: 'web',
  },
  {
    id: uuidv4(),
    title: 'Custom Subtitles Style',
    description: 'Desc 4',
    status: 'Released',
    platform: 'web',
  },
  {
    id: uuidv4(),
    title: 'Clip Organizer Syncronization ',
    description: 'Desc 4',
    status: 'In Progress',
    platform: 'mobile',
  },
  {
    id: uuidv4(),
    title: 'Invite colleagues for recording',
    description: 'Desc 4',
    status: 'In Progress',
    platform: 'mobile',
  },
  {
    id: uuidv4(),
    title: 'Clip Organizer Redesign ',
    description: 'Desc 4',
    status: 'Released',
    platform: 'mobile',
  },
  {
    id: uuidv4(),
    title: 'Chapters',
    description: 'Desc 4',
    status: 'Released',
    platform: 'web',
  },

  {
    id: uuidv4(),
    title: 'CTA',
    description: 'Desc 4',
    status: 'Released',
    platform: 'web',
  },
  {
    id: uuidv4(),
    title: 'Home Page',
    description: 'Desc 4',
    status: 'Released',
    platform: 'web',
  },
]
