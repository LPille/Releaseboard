import React, { createContext, useState, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Task, Filter, BoardSections, Status } from '../components/constants/types'
import { initializeBoard } from '../components/utils/board'
import { FILTERS, INITIAL_TASKS } from '../data'
import { v4 as uuidv4 } from 'uuid'
import { getTaskById, getTasksByStatus } from '../components/utils/task'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../services/firebase'

interface BoardContextProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  handleAddTask: (section: any, platform: number) => void
  handleDeleteTask: (section: string, task: Task) => void
  handleUpdateTask: (newTask: Task) => void
  boardSections: BoardSections | undefined
  locked: boolean
  setLocked: React.Dispatch<React.SetStateAction<boolean>>
  filters: Filter[]
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
  setBoardSections: React.Dispatch<React.SetStateAction<BoardSections | undefined>> | undefined
}

export const BoardContext = createContext<BoardContextProps | undefined>(undefined)

export const BoardProvider = (props: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [boardSections, setBoardSections] = useState<BoardSections>()
  const [filters, setFilters] = useState<Filter[]>(FILTERS)
  const [locked, setLocked] = useState<boolean>(false)

  const tasksCollectionRef = collection(db, 'tasks')

  useEffect(() => {
    const fetchTasksFromFirebase = async () => {
      const data = await getDocs(tasksCollectionRef)
      const tasks: Task[] = data.docs.map((doc) => doc.data() as Task)
      //console.log('== new task ', tasks)
      setTasks(tasks)
      setBoardSections(initializeBoard(tasks))
    }

    fetchTasksFromFirebase()
  }, [])

  const handleAddTask = async (section: string, platform: number) => {
    const task: Task = {
      id: uuidv4(),
      title: 'Add Task',
      description: '',
      status:
        section === '1' ? { id: 1, name: 'Not started' } : section === '2' ? { id: 2, name: 'In Progress' } : { id: 3, name: 'Done' },
      platform: platform === 1 ? { id: 1, name: 'web' } : { id: 2, name: 'mobile' },
    }
    setBoardSections((boardSection) => {
      if (!boardSection) return
      return {
        ...boardSection,
        [section]: [...boardSection[section], task],
      }
    })

    setTasks([...tasks, task])
  }

  const handleDeleteTask = async (section: string, task: Task) => {
    if (boardSections) {
      console.log('=== delete in ', task.status.id, ' Section ', boardSections[task.status.id])
    }
    setBoardSections((boardSection) => {
      if (!boardSection) return
      return {
        ...boardSection,
        [section]: boardSection[section].filter((item) => item.id !== task.id),
      }
    })

    setTasks(tasks.filter((t) => t.id !== task.id))
  }

  useEffect(() => {
    //console.log('=================  After ');

    //console.log('=== BS ', boardSections)
    //console.log('=== tasks ', tasks)
  }, [boardSections, tasks])

  const handleUpdateTask = async (newTask: Task) => {
    setBoardSections((boardSection) => {
      if (!boardSection) return
      return {
        ...boardSection,
        [newTask.status.id]: boardSection[newTask.status.id].map((t) => {
          if (t.id === newTask.id) {
            return {
              ...newTask,
            }
          }
          return t
        }),
      }
    })

    setTasks(tasks.map((t) => (t.id === newTask.id ? newTask : t)))
  }

  const value: BoardContextProps = {
    tasks: tasks,
    setTasks: setTasks,
    boardSections: boardSections,
    filters: filters,
    handleAddTask: handleAddTask,
    handleDeleteTask: handleDeleteTask,
    handleUpdateTask: handleUpdateTask,
    setFilters: setFilters,
    setBoardSections: setBoardSections,
    setLocked: setLocked,
    locked: locked,
  }

  return <BoardContext.Provider value={value}>{props.children}</BoardContext.Provider>
}
