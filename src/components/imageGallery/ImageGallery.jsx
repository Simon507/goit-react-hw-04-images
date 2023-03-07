import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Imagelist, GalleryItem } from './ImageGallery.styles';

export const ImageGallery = ({ collections, onImageClick }) => {
  return (
    <Imagelist className="gallery">
      {collections.map(item => (
        <GalleryItem key={item.id}>
          <ImageGalleryItem
            largeImageURL={item.largeImageURL}
            tags={item.tags}
            onImageClick={onImageClick}
          />
        </GalleryItem>
      ))}
    </Imagelist>
  );
};

ImageGallery.propTypes = {
  collections: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
