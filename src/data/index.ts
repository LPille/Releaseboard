import { STATUS } from './../components/constants/types'
import { v4 as uuidv4 } from 'uuid'
import { Filter, Task } from '../components/constants/types'

export const FILTERS: Filter[] = [
  {
    type: 1,
    name: 'Web',
    active: true,
    color: 'var(--web-color)',
  },
  {
    type: 2,
    name: 'Mobile',
    active: true,
    color: 'var(--mobile-color)',
  },
]

export const INITIAL_TASKS: Task[] = [
  {
    id: uuidv4(),
    title: 'Recording helper finding position  based on video assets: subs, logo, panels',
    description: 'Desc 2',
    status: { id: 1, name: 'Not started' },
    platform: { id: 2, name: 'mobile' },
  },
  {
    id: uuidv4(),
    title: 'Zoom',
    description: 'Desc 3',
    status: { id: 1, name: 'Not started' },
    platform: { id: 1, name: 'web' },
  },
]
