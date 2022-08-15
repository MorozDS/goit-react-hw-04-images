import React, { useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ pictures }) {
  const [largeImageURL, setlargeImageURL] = useState('');
  const [tags, settags] = useState('');

  const selectImage = (largeImageURL, tags) => {
    setlargeImageURL(largeImageURL);
    settags(tags);
  };

  const closeModal = () => {
    setlargeImageURL('');
    settags('');
  };

  return (
    <>
      <ul className={s.ImageGallery}>
        {pictures.map(image => (
          <li
            key={image.id}
            onClick={() => selectImage(image.largeImageURL, image.tags)}
          >
            <ImageGalleryItem
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              tags={image.tags}
            />
          </li>
        ))}
      </ul>
      {largeImageURL && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
