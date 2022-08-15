import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  static propTypes = {
    pictures: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ),
  };

  showModal = ({ largeImageURL, tags }) => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
      tags: tags,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
      tags: '',
    });
  };

  render() {
    const { pictures } = this.props;

    return (
      <>
        <ul className={s.ImageGallery}>
          {pictures.map(image => (
            <li key={image.id}>
              <ImageGalleryItem
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                tags={image.tags}
                showModal={this.showModal}
              />
            </li>
          ))}
        </ul>
        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            tags={this.state.tags}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}
