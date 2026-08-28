import { ReactNode, useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '@components/Button';

import styles from './Modal.module.scss';

interface ModalProps {
  heading: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ heading, children, isOpen, onClose }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleClickEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleClickEsc);
    return () => window.removeEventListener('keydown', handleClickEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div ref={overlayRef} onClick={handleClickOverlay} className={styles.overlay}>
      <div className={styles.block}>
        <div className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          <Button className={styles.exit} onClick={() => onClose()}>
            <FontAwesomeIcon icon={faX} />
          </Button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
