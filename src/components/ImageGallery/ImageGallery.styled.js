import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const ErrorTitle = styled.h1`
  text-align: center;
  color: red;
`;

export const ErrorDescr = styled.p`
  text-align: center;
  color: orangered;
  font-size: 20px;
`;

export const EndCollection = styled.p`
  text-align: center;
  color: blue;
  font-size: 20px;
  font-weight: 500;
`;
