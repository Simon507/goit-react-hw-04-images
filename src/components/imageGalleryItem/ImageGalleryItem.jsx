import PropTypes from 'prop-types';
import { ImageItem } from './ImageGalleryItem.styles';

export const ImageGalleryItem = ({ largeImageURL, tags, onImageClick }) => {
  return (
    <>
      <ImageItem
        src={largeImageURL}
        alt={tags}
        className="gallery-item"
        onClick={e => {
          e.preventDefault();
          onImageClick(largeImageURL, tags);
        }}
      />
    </>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
