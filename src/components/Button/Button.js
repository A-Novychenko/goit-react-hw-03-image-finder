import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

export const Button = ({ onCLick }) => (
  <ButtonLoadMore type="button" onClick={onCLick}>
    Load more
  </ButtonLoadMore>
);

Button.propTypes = {
  onCLick: PropTypes.func.isRequired,
};
