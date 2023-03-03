import { Component } from 'react';
import { GlobalStyle } from 'constants/GlobalStyles';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = { keyword: '' };

  handlerKeyword = keyword => {
    this.setState({ keyword });
  };

  render() {
    const { keyword } = this.state;
    const handlerKeyword = this.handlerKeyword;

    return (
      <Container>
        <Searchbar onSubmit={handlerKeyword}></Searchbar>
        <ImageGallery keyword={keyword} />
        <GlobalStyle />
        <ToastContainer />
      </Container>
    );
  }
}
