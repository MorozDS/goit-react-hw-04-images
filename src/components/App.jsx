import React, { useState, useEffect, useRef } from 'react';
import ApiPictures from '../service/api';
import s from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Spiner from './Spiner/Spiner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const totalPages = totalHits / 12;

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!searchQuery) return;
    setStatus(Status.PENDING);

    ApiPictures(searchQuery, page).then(data => {
      if (data.totalHits === 0) {
        alert(`${searchQuery} not found!`);
        setStatus(Status.REJECTED);
      } else {
        setPictures(prevPictures => [...prevPictures, ...data.hits]);
        setStatus(Status.RESOLVED);
        setTotalHits(data.totalHits);
      }
    });

    if (bottomRef.current && page > 1) {
      bottomRef.current.scrollIntoView(false);
    }
  }, [searchQuery, page]);

  const onSearchClick = searchvalue => {
    if (searchvalue.toLowerCase() === searchQuery.toLowerCase()) return;
    setSearchQuery(searchvalue);
    setPictures([]);
    setPage(1);
  };

  const LoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <div className={s.container}>
        <Searchbar onSearchClick={onSearchClick} />
        {pictures && <ImageGallery pictures={pictures} />}
        {status === Status.PENDING && <Spiner />}

        {status === Status.RESOLVED && totalPages > page && (
          <Button handleClick={LoadMore} text="Load More" />
        )}
        <div ref={bottomRef}></div>
      </div>
    </>
  );
}
