import PropTypes from 'prop-types';

import { LoadMoreBtn, LoadMoreSection } from './loadMoreBtn.styles';

export const LoadMore = ({ onBtnClick }) => {
  return (
    <LoadMoreSection>
      <LoadMoreBtn type="button" onClick={onBtnClick}>
        Load more
      </LoadMoreBtn>
    </LoadMoreSection>
  );
};

LoadMore.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};
