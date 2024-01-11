import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Task } from '../../constants/types'
import BoardItem from '../BoardItem/BoardItem'
import SortableBoardItem from '../SortableBoardItem/SortableBoardItem'
import styles from './BoardSection.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

type BoardSectionProps = {
  id: string
  title: string
  tasks: Task[]
  handleAddTask: (section: any) => void
}

const BoardSection = ({ id, title, tasks, handleAddTask }: BoardSectionProps) => {
  const [isHovering, setIsHovering] = useState(false)
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div className={styles.boardSection} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <h2 className={styles.title}>{title}</h2>
      <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef}>
          {tasks.map((task) => (
            <Box key={task.id} sx={{ mb: 2 }}>
              <SortableBoardItem id={task.id}>
                <BoardItem isOverlay={false} task={task} />
              </SortableBoardItem>
            </Box>
          ))}
        </div>
      </SortableContext>

      <div className={cx(styles.newCardButton, { [styles.isHover]: isHovering })} onClick={() => handleAddTask(id)}>
        {' '}
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  )
}

export default BoardSection
