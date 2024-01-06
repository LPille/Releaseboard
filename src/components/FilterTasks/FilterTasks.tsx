import React, { useState } from 'react'
import styles from './FilterTasks.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'

type BoardSectionProps = {}

const BoardSection = ({}: BoardSectionProps) => {
  const [isHovering, setIsHovering] = useState(false)

  return <div className={styles.filterContainer}></div>
}

export default BoardSection
