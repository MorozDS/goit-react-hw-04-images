import React, { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSearchClick }) {
  const [searchvalue, setSearchvalue] = useState('');

  const onChange = e => {
    setSearchvalue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    onSearchClick(searchvalue);
  };

  return (
    <header className={s.searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.searchbutton}>
          <span className={s.SearchFormlabel}>Search</span>
        </button>

        <input
          className={s.SearchForminput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
          value={searchvalue}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
};
