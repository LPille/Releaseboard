import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Task } from '../../constants/types'
import BoardItem from '../BoardItem/BoardItem'
import SortableBoardItem from '../SortableBoardItem/SortableBoardItem'
import styles from './BoardSection.module.scss'
import cx from 'classnames'
import { useBoard } from '../../../context'

type BoardSectionProps = {
  id: string
  title: string
  tasks: Task[]
}

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { filters, handleAddTask, locked } = useBoard()
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  const [isHovering, setIsHovering] = useState(false)
  const { setNodeRef } = useDroppable({
    id,
  })

  const getBoardSectionName = () => {
    switch (title) {
      case '1':
        return 'Not Started'
      case '2':
        return 'In Progress'
      case '3':
        return 'Released'
      default:
        return ''
    }
  }

  useEffect(() => {
    const activePlatforms = filters.filter((f) => f.active).map((f) => f.type)
    const newTasks = tasks.filter((obj) => activePlatforms.includes(obj.platform.id))
    setFilteredTasks(newTasks)
  }, [filters, tasks])

  return (
    <div
      className={cx(styles.boardSection, {
        [styles.firstSection]: id === '1',
        [styles.secondSection]: id === '2',
        [styles.thirdSection]: id === '3',
      })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h2 className={styles.title}>{getBoardSectionName()}</h2>
      <SortableContext id={id} items={filteredTasks} strategy={verticalListSortingStrategy} disabled={locked}>
        <div ref={setNodeRef}>
          {filteredTasks.map((task) => (
            <Box key={task.id} sx={{ mb: 2 }}>
              <SortableBoardItem id={task.id}>
                <BoardItem section={id} isOverlay={false} task={task} />
              </SortableBoardItem>
            </Box>
          ))}
        </div>
      </SortableContext>
      {!locked && (
        <div className={cx('row', styles.newCardButton, { [styles.isHoverCard]: isHovering })}>
          <div className={cx('col-6', styles.addArea, styles.webArea)} onClick={() => handleAddTask(id, 1)}>
            <p className={styles.addText}>Add Web</p>
          </div>

          <div className={cx('col-6', styles.addArea, styles.mobileArea)} onClick={() => handleAddTask(id, 2)}>
            <p className={styles.addText}>Add Mobile</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BoardSection
