import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Toaster } from '../Toaster';
import Loader from '../loader/Loader';
import { LoaderBox } from './searchQuerry.styles';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const SearchQuerry = ({ target, onFind, page }) => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMesage] = useState(null);

  useEffect(() => {
    // if (!target) {
    //   return;
    // }
    setLoading(true);

    axios
      .get(
        `?q=${target}&page=${page}&key=32355141-118a8dcb9c7f98144e9365121&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(obj => {
        if (obj.data.hits.length === 0) {
          setErrorMesage(
            'There are no images for this request, please try another one!!!'
          );
          return;
        } else {
          onFind(obj.data.hits, obj.data.totalHits);
          setErrorMesage(null);
        }
      })
      .catch(error => {
        setErrorMesage(error);
      })
      .finally(setLoading(false));
  }, [target, page, onFind]);

  return (
    <>
      {errorMessage && <Toaster message={errorMessage} />}

      {isLoading && (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      )}
    </>
  );
};

SearchQuerry.propTypes = {
  target: PropTypes.string.isRequired,
  onFind: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
