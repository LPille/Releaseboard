// PasswordModal.js
import { Box } from '@mui/material'
import Modal from '@mui/material/Modal'
import React, { useState } from 'react'
import styles from './PasswordModal.module.scss'

type PasswordModalProps = {
  isOpen: boolean
  onClose: () => void
  onPasswordSubmit: (password: string) => void
}

const PasswordModal = ({ isOpen, onClose, onPasswordSubmit }: PasswordModalProps) => {
  const [password, setPassword] = useState('')

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(e.target.value)
  }

  const handleUnlock = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    onPasswordSubmit(password)
    setPassword('')
    onClose()
  }

  return (
    <Modal className={styles.passwordModal} open={isOpen} onClose={onClose}>
      <Box className={styles.box}>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
          onKeyPress={handleUnlock}
        />
        <button className={styles.submit} onClick={handleSubmit}>
          Unlock
        </button>
      </Box>
    </Modal>
  )
}

export default PasswordModal
