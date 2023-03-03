import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => (
  <Item>
    <Img src={webformatURL} alt={tags} />
  </Item>
);
