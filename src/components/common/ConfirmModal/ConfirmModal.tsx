import { ReactNode } from 'react';

import Modal from '../Modal';

import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  heading: string;
  message: string | ReactNode;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal = ({ heading, message, isOpen, onConfirm, onClose }: ConfirmModalProps) => {
  return (
    <Modal heading={heading} onClose={onClose} isOpen={isOpen}>
      <div className={styles.info}>{typeof message === 'string' ? <p>{message}</p> : message}</div>
      <div className={styles.actions}>
        <button className={styles.button} onClick={onConfirm}>
          Подтвердить
        </button>
        <button className={styles.button} onClick={onClose}>
          Отменить
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
