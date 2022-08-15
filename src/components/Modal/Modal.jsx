import React, { Component } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.pushKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.pushKeydown);
  }

  pushKeydown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <div className={s.backdrop} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
