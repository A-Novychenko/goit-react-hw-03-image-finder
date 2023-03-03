import { RotatingLines } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

export const Loader = () => (
  <LoaderWrap>
    <RotatingLines
      strokeColor="blue"
      strokeWidth="5"
      animationDuration="3"
      width="128"
      visible={true}
    />
  </LoaderWrap>
);
