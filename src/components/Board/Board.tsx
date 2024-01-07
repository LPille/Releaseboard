import React, { useState } from 'react'
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'
import { INITIAL_TASKS } from '../../data/index'
import { BoardSections as BoardSectionsType } from './types'
import { getTaskById } from './utils/task'
import { findBoardSectionContainer, initializeBoard } from './utils/board'
import BoardSection from './BoardSection'
import TaskItem from './TaskItem'
import styles from './Board.module.scss'
import cn from 'classnames'
import { useBoard } from '../../context'

const Board = () => {
  const { tasks, boardSections, setBoardSections, filters, setFilters } = useBoard()

  const initialBoardSections = initializeBoard(INITIAL_TASKS)
  //const [boardSections, setBoardSections] = useState<BoardSectionsType>(initialBoardSections)
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string)
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    if (boardSections && setBoardSections) {
      const activeContainer = findBoardSectionContainer(boardSections, active.id as string)
      const overContainer = findBoardSectionContainer(boardSections, over?.id as string)

      if (!activeContainer || !overContainer || activeContainer === overContainer) {
        return
      }

      setBoardSections((boardSection) => {
        if (boardSection) {
          const activeItems = boardSection[activeContainer]
          const overItems = boardSection[overContainer]

          // Find the indexes for the items
          const activeIndex = activeItems.findIndex((item) => item.id === active.id)
          const overIndex = overItems.findIndex((item) => item.id !== over?.id)

          return {
            ...boardSection,
            [activeContainer]: [...boardSection[activeContainer].filter((item) => item.id !== active.id)],
            [overContainer]: [
              ...boardSection[overContainer].slice(0, overIndex),
              boardSections[activeContainer][activeIndex],
              ...boardSection[overContainer].slice(overIndex, boardSection[overContainer].length),
            ],
          }
        }
      })
    }
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (boardSections && setBoardSections) {
      const activeContainer = findBoardSectionContainer(boardSections, active.id as string)
      const overContainer = findBoardSectionContainer(boardSections, over?.id as string)

      if (!activeContainer || !overContainer || activeContainer !== overContainer) {
        return
      }

      const activeIndex = boardSections[activeContainer].findIndex((task) => task.id === active.id)
      const overIndex = boardSections[overContainer].findIndex((task) => task.id === over?.id)

      if (activeIndex !== overIndex) {
        setBoardSections((boardSection) => {
          if (boardSection) {
            return {
              ...boardSection,
              [overContainer]: arrayMove(boardSection[overContainer], activeIndex, overIndex),
            }
          } else {
            console.error('boardSection is undefined')
            return boardSection
          }
        })
      }

      setActiveTaskId(null)
    }
  }

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  }

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null

  return (
    <div className={cn('container', styles.boardContainer)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className={'row justify-content-end'}>
          {boardSections &&
            Object.keys(boardSections).map((boardSectionKey) => (
              <div className={cn('col-3')} key={boardSectionKey}>
                <BoardSection id={boardSectionKey} title={boardSectionKey} tasks={boardSections[boardSectionKey]} />
              </div>
            ))}
          <DragOverlay dropAnimation={dropAnimation}>{task ? <TaskItem task={task} /> : null}</DragOverlay>
        </div>
      </DndContext>
    </div>
  )
}

export default Board
