import React, { Component } from 'react';
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

export default class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    page: 1,
    totalHits: null,
    status: Status.IDLE,
  };

  bottomRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: Status.PENDING });

      ApiPictures(this.state.searchQuery, this.state.page).then(data => {
        if (data.totalHits === 0) {
          alert(`${this.state.searchQuery} not found!`);

          this.setState({
            status: Status.REJECTED,
          });
        } else {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...data.hits],
            status: Status.RESOLVED,
            totalHits: data.totalHits,
          }));
        }
      });
    }

    if (this.state.page > 1) {
      this.bottomRef.current.scrollIntoView(false);
    }
  }

  onSearchClick = searchvalue => {
    if (searchvalue.toLowerCase() === this.state.searchQuery.toLowerCase())
      return;
    this.setState({ searchQuery: searchvalue, pictures: [], page: 1 });
  };

  LoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const totalPages = this.state.totalHits / 12;
    return (
      <>
        <div className={s.container}>
          <Searchbar onSearchClick={this.onSearchClick} />
          {this.state.pictures && (
            <ImageGallery pictures={this.state.pictures} />
          )}
          {this.state.status === Status.PENDING && <Spiner />}

          {this.state.status === Status.RESOLVED &&
            totalPages > this.state.page && (
              <Button handleClick={this.LoadMore} text="Load More" />
            )}
          <div ref={this.bottomRef}></div>
        </div>
      </>
    );
  }
}
