import React from 'react'
import styles from './Home.module.scss'
import Board from '../../components/Board/Board'
import FilterTasks from '../../components/FilterTasks/FilterTasks'

export const Home = () => (
  <div className={styles.home}>
    <h1 className={styles.homeTitle}>Release Overview</h1>
    <FilterTasks />
    <Board />
  </div>
)
