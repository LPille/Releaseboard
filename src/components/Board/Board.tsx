import React, { useState } from 'react'
import {
  useSensors,
  useSensor,
  PointerSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { INITIAL_TASKS } from '../../data/index'
import { BoardSections as BoardSectionsType } from '../constants/types'
import { getTaskById } from '../utils/task'
import { findBoardSectionContainer, initializeBoard } from '../utils/board'
import BoardSection from './BoardSection/BoardSection'
import BoardItem from './BoardItem/BoardItem'
import styles from './Board.module.scss'
import cn from 'classnames'
import { useBoard } from '../../context'

const Board = () => {
  const { tasks, setTasks, boardSections, setBoardSections, filters, setFilters, handleAddTask } = useBoard()

  const initialBoardSections = initializeBoard(INITIAL_TASKS)
  //const [boardSections, setBoardSections] = useState<BoardSectionsType>(initialBoardSections)
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  /*   useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }) */
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
      //console.log('=== activeIndex ', activeIndex, ' overIndex ', overIndex)

      if (activeIndex !== overIndex) {
        /*           setTasks((task) => {
          if (task) {
            return {
              ...task, []
              
            }
          }})  */
        //console.log('=== new ', arrayMove(boardSections[overContainer], activeIndex, overIndex)) // Over Index can be -1 when list is empty
        //const index = overIndex === -1 ? 0 : overIndex
        //console.log('=== id ', boardSections[overContainer][overIndex]?.id) //
        /*         setTasks((task) => {
          if (task) {
            return task.map((t) => {
              if (t.id === boardSections[overContainer][overIndex]?.id) {
                return {
                  ...t,
                  status: overContainer as any,
                }
              }
              return t
            })
          }
          return task
        }) */

        setBoardSections((boardSection) => {
          if (boardSection) {
            //console.log('=== arrayMove ', arrayMove(boardSection[overContainer], activeIndex, overIndex)); // Over Index can be -1 when list is empty
            //console.log('=== id ', arrayMove(boardSection[overContainer], activeIndex, overIndex)[overIndex].title);
            //console.log('=== id ',boardSection[overContainer][overIndex].id ); //

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
                <BoardSection
                  id={boardSectionKey}
                  title={boardSectionKey}
                  tasks={boardSections[boardSectionKey]}
                  handleAddTask={handleAddTask}
                />
              </div>
            ))}
          <DragOverlay dropAnimation={dropAnimation} style={{}}>
            {task ? <BoardItem isOverlay={true} task={task} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  )
}

export default Board
