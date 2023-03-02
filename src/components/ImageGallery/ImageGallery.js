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
    status: Status.IDLE,
    images: [],
    error: null,
    page: 1,
  };

  //   shouldComponentUpdate(nextProps, nextState) {
  //     return nextProps !== this.props || nextState.page < this.page;
  //   }

  componentDidUpdate(prevProps, prevState) {
    const prevKeyword = prevProps.keyword;
    const nextKeyword = this.props.keyword;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevKeyword !== nextKeyword || prevPage !== nextPage) {
      this.setState(prevState => ({
        // ...prevState,
        status: Status.PENDING,
      }));

      fetchImage(nextKeyword, nextPage)
        .then(({ hits }) =>
          this.setState(prevState => ({
            images:
              prevKeyword !== nextKeyword
                ? [...hits]
                : [...prevState.images, ...hits],
            status: Status.RESOLVED,
            page: prevKeyword !== nextKeyword ? 1 : this.state.page,
          }))
        )
        .catch(error =>
          this.setState(prevState => ({
            error,
            status: Status.REJECTED,
          }))
        );
    }
  }

  changePage = () => {
    this.setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images } = this.state;
    const onchangePage = this.changePage;

    // console.log('images', images);

    return (
      <>
        <List>
          {images.map(image => (
            <ImageGalleryItem key={image.pageURL} image={image} />
          ))}
        </List>
        <Button onCLick={onchangePage} />
      </>
    );
  }
}
