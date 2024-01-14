import { Task } from '../../constants/types'
import styles from './BoardItem.module.scss'
import cn from 'classnames'
import { toast } from 'react-hot-toast'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import useAutosizeTextArea from '../../../hooks/useAutosizeTextArea'
import { useBoard } from '../../../context'
import { rotate, deleteIcon } from '../../../assets/icons/icons'

type TaskItemProps = {
  task: Task
  section: string | undefined
  isOverlay: boolean | null
}

const BoardItem = ({ section, task, isOverlay = false }: TaskItemProps) => {
  const [isHoverCard, setIsHoverCard] = useState<Boolean>(false)
  const [value, setValue] = useState(task.title || '')
  const [isEditing, setIsEditing] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const { locked, handleDeleteTask, handleUpdateTask } = useBoard()

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textAreaRef.current, value)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target?.value
    setValue(value)
    /*    if(setIsAddNewField){
      setIsAddNewField(false);
    } */
  }

  useEffect(() => {
    if (!isEditing) {
      const newTask: Task = { ...task, title: value }
      handleUpdateTask(newTask)
    }
  }, [isEditing, value])

  const toggleMouseEnterCard = () => {
    setIsHoverCard(true)
  }

  const toggleMouseLeaveCard = () => {
    setIsHoverCard(false)
  }

  const clickDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    if (!section) return
    handleDeleteTask(section, task)
    toast.success('Task deleted successfully!', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333333',
        color: '#fff',
      },
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setIsEditing(false)
      //setIsHoverField(false);
    }
  }

  const changeMode = () => {
    //setLocked((locked) => !locked)
    toast.success('Change Platform successfully!', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333333',
        color: '#fff',
      },
    })
  }

  return (
    <>
      <div
        className={cn(styles.card, { [styles.mobile]: task.platform.id === 2, [styles.web]: task.platform.id === 1 })}
        onMouseEnter={() => toggleMouseEnterCard()}
        onMouseLeave={() => toggleMouseLeaveCard()}
        onClick={() => {}}
      >
        <div className={cn(styles.bodyWrapper)}>
          <textarea
            id="editableField"
            value={value}
            disabled={locked}
            onChange={(e) => handleChange(e)}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            ref={textAreaRef}
            placeholder={''}
            rows={1}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        {!locked && !isOverlay && (
          <div className={cn(styles.actions, { [styles.hover]: isHoverCard && !isEditing })}>
            <div className={cn(styles.action, styles.rotateIcon)} onClick={changeMode}>
              {rotate}
            </div>
            <div className={cn(styles.action, styles.deleteIcon)} onClick={clickDelete}>
              {deleteIcon}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default BoardItem
