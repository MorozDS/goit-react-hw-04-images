import React, { Component } from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
  };

  render() {
    const { handleClick, text } = this.props;
    return (
      <button className={s.Button} type="button" onClick={handleClick}>
        {text}
      </button>
    );
  }
}
