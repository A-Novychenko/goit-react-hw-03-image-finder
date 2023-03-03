import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onToggleModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.hendleESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleESC);
  }

  hendleESC = e => {
    if (e.code === 'Escape') {
      this.props.onToggleModal();
    }
  };

  hendleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onToggleModal();
    }
  };

  render() {
    const { children } = this.props;
    const closeModalBacdrop = this.hendleBackdrop;

    return createPortal(
      <>
        <Overlay onClick={closeModalBacdrop}>
          <ModalContent>{children}</ModalContent>
        </Overlay>
      </>,
      modalRoot
    );
  }
}
