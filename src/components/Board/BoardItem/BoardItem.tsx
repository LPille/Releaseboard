import { Task } from '../../constants/types'
import styles from './BoardItem.module.scss'
import cn from 'classnames'
import { toast } from 'react-hot-toast'
import { ChangeEvent, useRef, useState } from 'react'
import useAutosizeTextArea from '../../../hooks/useAutosizeTextArea'

type TaskItemProps = {
  task: Task
  isOverlay: boolean | null
}

const BoardItem = ({ task, isOverlay = false }: TaskItemProps) => {
  const [isHoverCard, setIsHoverCard] = useState<Boolean>(false)
  const [value, setValue] = useState(task.title || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);
  
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target?.value;
    setValue(value);
 /*    if(setIsAddNewField){
      setIsAddNewField(false);
    } */
  }; 


  const toggleMouseEnterCard = () => {
    setIsHoverCard(true)
  }

  const toggleMouseLeaveCard = () => {
    setIsHoverCard(false)
  }

  const clickHandleText = () => {
    console.log('clickHandleText')
    toast.success('Recipe changed successfully!', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333333',
        color: '#fff',
      },
    })
  }

  const clickDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    //handleDeleteRecipe(recipeId)
    console.log('clickDelete')
    toast.success('Recipe deleted successfully!', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333333',
        color: '#fff',
      },
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' ) {  
      event.preventDefault();
      setIsEditing(false);
      //setIsHoverField(false);
    }
  }

  return (
    <>
      <div
        className={cn(styles.card, { [styles.web]: task.platform === 'web', [styles.mobile]: task.platform === 'mobile' })}
        onMouseEnter={() => toggleMouseEnterCard()}
        onMouseLeave={() => toggleMouseLeaveCard()}
        onClick={clickHandleText}
      >
        <div className={cn(styles.bodyWrapper)}>
        <textarea
          id='editableField'
          value={value}
          onChange={e => handleChange(e)}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          ref={textAreaRef}
          placeholder={''}
          rows={1}
          onKeyDown={(e) => handleKeyDown(e)}
          />

{/*           <h5 className={styles.cardTitle}>{task.title}</h5>
 */}        </div>
        {!isOverlay && (
          <div className={cn(styles.actions, { [styles.hover]: isHoverCard })}>
            <div className={cn(styles.action, styles.delete)} onClick={clickDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff">
                <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default BoardItem
