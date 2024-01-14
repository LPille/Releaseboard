import React, { useState } from 'react'
import styles from './ReleaseOverview.module.scss'
import Board from '../../components/Board/Board'
import FilterTasks from '../../components/FilterTasks/FilterTasks'
import { lock, unlock } from '../../assets/icons/icons'
import { useBoard } from '../../context/useBoard'
import PasswordModal from '../../components/PasswordModal/PasswordModal'

export const ReleaseOverview = () => {
  const { locked, setLocked } = useBoard()
  const [isModalOpen, setModalOpen] = useState(false)

  const toggleLockClick = () => {
    if (locked) {
      openModal()
      return
    } else {
      setLocked(true)
    }
    //setLocked((locked) => !locked)
  }

  const handlePasswordSubmit = (password: string) => {
    if (password === 'test') {
      setLocked(false)
    } else {
      alert('Incorrect password')
    }
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className={styles.home}>
      <div className={styles.homeHeader}>
        <h1 className={styles.homeTitle}>
          Release <br /> Overview
        </h1>
        {/* Add a svg image from the assets  */}
        <FilterTasks />
      </div>
      <div className={styles.lockIcon} onClick={toggleLockClick}>
        {locked ? lock : unlock}
      </div>
      <Board />
      <PasswordModal isOpen={isModalOpen} onClose={closeModal} onPasswordSubmit={handlePasswordSubmit} />
    </div>
  )
}
