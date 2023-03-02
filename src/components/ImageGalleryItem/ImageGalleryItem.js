import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL },
}) => (
  <Item>
    <Img src={webformatURL} alt="" />
  </Item>
);
