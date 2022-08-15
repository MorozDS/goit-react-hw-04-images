import React, { useEffect } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ largeImageURL, tags, closeModal }) {
  useEffect(() => {
    const pushKeydown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', pushKeydown);
    return () => window.removeEventListener('keydown', pushKeydown);
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
