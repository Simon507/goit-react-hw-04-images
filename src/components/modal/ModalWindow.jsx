import { Overlay, ModalFrame } from './ModalWindow.styles';
import PropTypes from 'prop-types';

export const ModalWindow = ({ largeImageURL, tags, onModalClose }) => {
  console.log(largeImageURL);
  console.log(tags);

  window.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      console.log(`asdadad`);
      onModalClose();
    }
  });

  return (
    <Overlay className="overlay" onClick={onModalClose}>
      <ModalFrame className="modal">
        <img src={largeImageURL} alt={tags} />
      </ModalFrame>
    </Overlay>
  );
};

ModalWindow.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
