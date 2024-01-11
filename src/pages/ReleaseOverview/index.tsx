import React from 'react'
import styles from './ReleaseOverview.module.scss'
import Board from '../../components/Board/Board'
import FilterTasks from '../../components/FilterTasks/FilterTasks'

export const ReleaseOverview = () => (
  <div className={styles.home}>
    <div className={styles.homeHeader}>
      <h1 className={styles.homeTitle}>Release Overview</h1>
      <FilterTasks />
    </div>
    <Board />
  </div>
)
