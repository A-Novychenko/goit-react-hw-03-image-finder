import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import { Button } from 'components/Button';
import { fetchImage } from '../../services/pixabayAPI';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  state = {
    searchKeyword: '',
    status: Status.IDLE,
    images: [],
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevKeyword = prevProps.keyword;
    const nextKeyword = this.props.keyword;
    const PrevSearchKeyword = prevState.searchKeyword;
    const NextsearchKeyword = this.state.searchKeyword;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevPage !== nextPage || PrevSearchKeyword !== NextsearchKeyword) {
      this.setState({
        status: Status.PENDING,
      });

      setTimeout(() => {
        fetchImage(NextsearchKeyword, nextPage)
          .then(({ hits }) =>
            this.setState(prevState => ({
              images: [...prevState.images, ...hits],
              status: Status.RESOLVED,
              page: nextPage,
            }))
          )
          .catch(error =>
            this.setState({
              error,
              status: Status.REJECTED,
            })
          );
      }, 30);
    }

    if (prevKeyword !== nextKeyword) {
      this.setState({
        searchKeyword: nextKeyword,
        status: Status.IDLE,
        images: [],
        error: null,
        page: 1,
      });
    }
  }

  changePage = () => {
    this.setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error } = this.state;
    const onchangePage = this.changePage;

    console.log('images', images);

    return (
      <>
        <List>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </List>
        {images.length > 0 && this.state.status !== Status.PENDING && (
          <Button onCLick={onchangePage} />
        )}
        {this.state.status === Status.REJECTED ||
          (images.length === 0 && (
            <h1>!!!!!!!!!!!!!! {error} !!!!!!!!!!!!!!!</h1>
          ))}
      </>
    );
  }
}
