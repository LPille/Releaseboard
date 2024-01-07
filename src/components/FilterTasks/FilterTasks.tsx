import React, { useState } from 'react'
import styles from './FilterTasks.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import { Task, Filter, BoardSections as BoardSectionsType } from '../../components/Board/types'
import { useBoard } from '../../context'

type FilterTasksProps = {}

const FilterTasks = ({}: FilterTasksProps) => {
  const [isHovering, setIsHovering] = useState(false)

  const { tasks, boardSections, filters, setFilters } = useBoard()

  // show all possible Filter
  const handleClickFilter = (filter: Filter) => {
    setFilters((filters) => {
      const newFilters = filters.map((f) => {
        if (f.type === filter.type) {
          return {
            ...f,
            active: !f.active,
          }
        }
        return f
      })
      return newFilters
    })
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterButtons}>
        {filters.map((filter) => (
          <div
            key={filter.type}
            className={styles.filterButton}
            style={{ color: filter.color, opacity: filter.active ? 1 : 0.5 }}
            onClick={() => handleClickFilter(filter)}
          >
            <div className={styles.circle} style={{ backgroundColor: filter.color }} />
            <div className={styles.filterName}>{filter.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterTasks
