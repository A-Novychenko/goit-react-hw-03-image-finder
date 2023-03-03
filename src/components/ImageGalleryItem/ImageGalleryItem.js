import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    showModal: false,
  };

  hendleShowModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const {
      image: { tags, webformatURL, largeImageURL },
    } = this.props;
    const { showModal } = this.state;
    const onToggleModal = this.hendleShowModal;

    return (
      <>
        <Item onClick={onToggleModal}>
          <Img src={webformatURL} alt={tags} />
        </Item>
        {showModal && (
          <Modal onToggleModal={onToggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
