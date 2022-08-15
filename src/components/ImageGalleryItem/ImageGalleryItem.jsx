import React, { Component } from 'react';
import s from './GalleryItem.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
  };

  render() {
    const { webformatURL, largeImageURL, tags, showModal } = this.props;
    return (
      <img
        className={s.ImageGalleryItem}
        src={webformatURL}
        alt={tags}
        onClick={() => showModal({ largeImageURL, tags })}
      />
    );
  }
}
