import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import {
  List,
  ErrorTitle,
  ErrorDescr,
  EndCollection,
} from './ImageGallery.styled';
import { Button } from 'components/Button';
import { fetchImage } from '../../services/pixabayAPI';
import { Loader } from 'components/Loader';

export class ImageGallery extends Component {
  static propTypes = {
    keyword: PropTypes.string.isRequired,
  };

  state = {
    searchKeyword: '',
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const nextKeyword = this.props.keyword;
    const PrevSearchKeyword = prevState.searchKeyword;
    const NextsearchKeyword = this.state.searchKeyword;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevPage !== nextPage || PrevSearchKeyword !== NextsearchKeyword) {
      this.setState({
        isLoading: true,
        error: null,
      });

      try {
        const {
          data: { hits, total, totalHits },
        } = await fetchImage(NextsearchKeyword, nextPage);

        if (!total || !hits) {
          return await Promise.reject(
            new Error(`"${NextsearchKeyword}" NOT FOUND !`)
          );
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: nextPage,
          totalHits,
        }));
      } catch (error) {
        this.setState({
          error,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }

    if (prevProps !== this.props) {
      this.setState({
        searchKeyword: nextKeyword,
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
    const { images, error, totalHits } = this.state;
    const onchangePage = this.changePage;

    return (
      <>
        <List>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </List>

        {!this.state.isLoading && !error && images.length < totalHits && (
          <Button onCLick={onchangePage} />
        )}

        {this.state.isLoading && <Loader />}

        {!this.state.isLoading &&
          images.length > 0 &&
          images.length >= totalHits && (
            <EndCollection>
              There are no more images for this query.
            </EndCollection>
          )}
        {this.state.error && (
          <>
            <ErrorTitle>
              Oops, something went wrong, please try again.
            </ErrorTitle>
            <ErrorDescr>{`ERROR: ${error.message}`}</ErrorDescr>
          </>
        )}
      </>
    );
  }
}
