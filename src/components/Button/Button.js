import { ButtonLoadMore } from './Button.styled';

export const Button = ({ onCLick }) => (
  <ButtonLoadMore type="button" onClick={onCLick}>
    Load more
  </ButtonLoadMore>
);
