import React, { createContext, useState, useEffect } from 'react'
//import { nanoid } from 'nanoid'
import { useLocalStorage } from 'usehooks-ts'
//import { getAllRecipes, addRecipe, deleteRecipe, updateRecipe } from '../services/axios'; // Update the path
import { nanoid } from 'nanoid'
import { Task, Filter, BoardSections } from '../components/Board/types'
import { initializeBoard } from '../components/Board/utils/board'
import { FILTERS, INITIAL_TASKS } from '../data'
import { v4 as uuidv4 } from 'uuid'

// Filter can be platform web or mobile

interface BoardContextProps {
  tasks: Task[]
  handleAddTask: () => void
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

  const handleAddTask = async () => {
    console.log('Add new Tasks')
    const task: Task = {
      id: uuidv4(),
      title: 'Custom Subtitles Style',
      description: 'Desc 4',
      status: 2,
      platform: 'web',
    }

    //const newRecipe = await addRecipe(newRecipeData);
    setTasks([...tasks, task])
    //setBoardSections([...recipes, newRecipeData])
  }

  const value: BoardContextProps = {
    tasks: tasks,
    boardSections: boardSections,
    filters: filters,
    handleAddTask: handleAddTask,
    setFilters: setFilters,
    setBoardSections: setBoardSections,
  }

  return <BoardContext.Provider value={value}>{props.children}</BoardContext.Provider>
}
