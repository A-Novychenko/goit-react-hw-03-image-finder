import { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabeel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    keyword: '',
  };

  handlerChange = e => {
    const keyword = e.currentTarget.value;

    this.setState({ keyword });
  };

  handlerSubmitForm = e => {
    e.preventDefault();

    const onSubmit = this.props.onSubmit;
    const { keyword } = this.state;
    const keywordNormalize = keyword.toLowerCase().trim();

    if (keywordNormalize !== '') {
      onSubmit(keywordNormalize);
    } else {
      toast.error('Enter text please', {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          color: 'red',
        },
      });
    }

    this.setState({ keyword: '' });
  };

  render() {
    const { keyword } = this.state;
    const handlerChange = this.handlerChange;
    const onSubmit = this.handlerSubmitForm;

    return (
      <Header>
        <SearchForm onSubmit={onSubmit}>
          <SearchFormBtn type="submit">
            <SearchFormBtnLabeel></SearchFormBtnLabeel>
            <BsSearch size={16} />
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            name="keyword"
            value={keyword}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handlerChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
