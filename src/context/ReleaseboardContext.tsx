// src/TaskboardContext.tsx
import React, { createContext, useContext, useReducer, Dispatch } from 'react'

type Task = {
  id: number
  title: string
}

type TaskList = {
  notStarted: Task[]
  inProgress: Task[]
  released: Task[]
}

type ReleaseboardState = {
  taskList: TaskList
}

type ReleaseboardAction =
  | {
      type: 'ADD_TASK'
      status: 'notStarted' | 'inProgress' | 'released'
      task: Task
    }
  | {
      type: 'MOVE_TASK'
      from: 'notStarted' | 'inProgress' | 'released'
      to: 'notStarted' | 'inProgress' | 'released'
      taskId: number
    }

type ReleaseboardDispatch = Dispatch<ReleaseboardAction>

const ReleaseboardStateContext = createContext<ReleaseboardState | undefined>(undefined)
const ReleaseboardDispatchContext = createContext<ReleaseboardDispatch | undefined>(undefined)

function releaseboardReducer(state: ReleaseboardState, action: ReleaseboardAction): ReleaseboardState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        taskList: {
          ...state.taskList,
          [action.status]: [...state.taskList[action.status], action.task],
        },
      }
    case 'MOVE_TASK':
      const { from, to, taskId } = action
      const taskToMove = state.taskList[from].find((task) => task.id === taskId)
      if (!taskToMove) return state

      return {
        ...state,
        taskList: {
          ...state.taskList,
          [from]: state.taskList[from].filter((task) => task.id !== taskId),
          [to]: [...state.taskList[to], taskToMove],
        },
      }
    default:
      return state
  }
}

export const ReleaseboardProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(releaseboardReducer, {
    taskList: {
      notStarted: [],
      inProgress: [],
      released: [],
    },
  })

  return (
    <ReleaseboardStateContext.Provider value={state}>
      <ReleaseboardDispatchContext.Provider value={dispatch}>{props.children}</ReleaseboardDispatchContext.Provider>
    </ReleaseboardStateContext.Provider>
  )
}

export function useReleaseboardState(): ReleaseboardState {
  const context = useContext(ReleaseboardStateContext)
  if (context === undefined) {
    throw new Error('useReleaseboardState must be used within a ReleaseboardProvider')
  }
  return context
}

export function useReleaseboardDispatch(): ReleaseboardDispatch {
  const context = useContext(ReleaseboardDispatchContext)
  if (context === undefined) {
    throw new Error('useReleaseboardDispatch must be used within a ReleaseboardProvider')
  }
  return context
}
