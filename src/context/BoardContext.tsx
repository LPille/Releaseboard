import React, { createContext, useState, useEffect } from 'react'
//import { nanoid } from 'nanoid'
import { useLocalStorage } from 'usehooks-ts'
//import { getAllRecipes, addRecipe, deleteRecipe, updateRecipe } from '../services/axios'; // Update the path
import { nanoid } from 'nanoid'
import { Task, Filter, BoardSections, Status } from '../components/constants/types'
import { initializeBoard } from '../components/utils/board'
import { FILTERS, INITIAL_TASKS } from '../data'
import { v4 as uuidv4 } from 'uuid'
import { getTaskById, getTasksByStatus } from '../components/utils/task'

// Filter can be platform web or mobile

interface BoardContextProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  handleAddTask: (section: any) => void
  boardSections: BoardSections | undefined
  filters: Filter[]
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
  setBoardSections: React.Dispatch<React.SetStateAction<BoardSections | undefined>> | undefined
}

export const BoardContext = createContext<BoardContextProps | undefined>(undefined)

export const BoardProvider = (props: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [boardSections, setBoardSections] = useState<BoardSections>()
  const [filters, setFilters] = useState<Filter[]>(FILTERS)

  useEffect(() => {
    const fetchTasks = async () => {
      const initialBoardSections = initializeBoard(INITIAL_TASKS)
      console.log('initialBoardSections', initialBoardSections)
      //const fetchedRecipes = await getAllRecipes();
      //console.log("fetchedRecipesl ", fetchedRecipes)
      setTasks(INITIAL_TASKS)
      setBoardSections(initialBoardSections)
    }
    fetchTasks()
  }, [])

  const handleAddTask = async (section: any) => {
    const task: Task = {
      id: uuidv4(),
      title: 'Custom Subtitles Style',
      description: 'Desc 4',
      status: 2,
      platform: 'web',
    }
    // add a new task to a specific board section
    setBoardSections((boardSection) => {
      if (!boardSection) return
      return {
        ...boardSection,
        [section as number]: [...boardSection[section as number], task],
      }
    })

    //const newRecipe = await addRecipe(newRecipeData);
    setTasks([...tasks, task])

    //setBoardSections([...recipes, newRecipeData])
  }

  useEffect(() => {
    // add Task to correct Board Section
    if (!boardSections) return
    const newBoardSections: BoardSections = {}

    Object.keys(boardSections).forEach((boardSectionKey) => {
      newBoardSections[boardSectionKey] = getTasksByStatus(tasks, boardSectionKey)
    })

    /*     const newBoardSections = boardSections?.map((boardSection: { tasks: any[] }) => {
      const newTasks = boardSection.tasks.map((task) => {
        const taskFromTasks = getTaskById(tasks, task.id)
        if (taskFromTasks) {
          return taskFromTasks
        }
        return task
      })
      return { ...boardSection, tasks: newTasks }
    }
    ) */

    // add a task to a board section

    //setBoardSections(newBoardSections)
  }, [tasks])

  const value: BoardContextProps = {
    tasks: tasks,
    setTasks: setTasks,
    boardSections: boardSections,
    filters: filters,
    handleAddTask: handleAddTask,
    setFilters: setFilters,
    setBoardSections: setBoardSections,
  }

  return <BoardContext.Provider value={value}>{props.children}</BoardContext.Provider>
}
