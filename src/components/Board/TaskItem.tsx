import { Task } from './types'
import styles from './Board.module.scss'
import cn from 'classnames'

type TaskItemProps = {
  task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div className={cn(styles.card, { [styles.web]: task.platform === 'web', [styles.mobile]: task.platform === 'mobile' })}>
      <h5 className={styles.cardTitle}>{task.title}</h5>
    </div>
  )
}

export default TaskItem
