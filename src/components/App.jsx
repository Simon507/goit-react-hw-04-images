import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Toaster } from './Toaster';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchBar } from './searchbar/SearchBar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { ModalWindow } from './modal/ModalWindow';
import { LoadMore } from './loadMoreBtn/LoadMoreBtn';
import { LoaderBox } from './app.styles';
import Loader from '../components/loader/Loader';

export const App = () => {
  const [collections, setCollections] = useState([]);
  const [target, setTarget] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSorse, setModalSorse] = useState('');
  const [modalTxt, setModalTxt] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [totalPage, setTotalPage] = useState(1);

  const onSubmit = targetSubmit => {
    if (!targetSubmit || targetSubmit.length === 0) {
      setErrorMessage('Please enter any words for request');
    } else {
      if (targetSubmit !== target) {
        setCollections([]);
        setPage(1);
      }

      setTarget(targetSubmit);
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    if (!target) {
      return;
    }
    setLoading(true);
    axios.defaults.baseURL = 'https://pixabay.com/api/';
    async function Response() {
      await axios
        .get(
          `?q=${target}&page=${page}&key=32355141-118a8dcb9c7f98144e9365121&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(obj => {
          if (obj.data.hits.length === 0) {
            setErrorMessage(
              'There are no images for this request, please try another one!!!'
            );
            return;
          } else {
            setCollections(prevState => [...prevState, ...obj.data.hits]);
            setTotalPage(Math.ceil(obj.data.totalHits / 12));
            setErrorMessage(null);
          }
        })
        .catch(error => {
          setErrorMessage(error);
        })
        .finally(setLoading(false));
    }
    Response();
  }, [target, page]);

  const onBtnClick = e => {
    let pageNumber = page;
    pageNumber += 1;
    setPage(pageNumber);
  };

  const onImageClick = (largeImageURL, tags) => {
    setModalOpen(true);
    setModalSorse(largeImageURL);
    setModalTxt(tags);
  };

  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Layout>
      <GlobalStyle />
      <SearchBar onSubmit={onSubmit}></SearchBar>

      {isLoading && (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      )}

      <ImageGallery
        collections={collections}
        onImageClick={onImageClick}
      ></ImageGallery>

      {collections.length > 0 && page < totalPage && (
        <LoadMore onBtnClick={onBtnClick} />
      )}

      {modalOpen && (
        <ModalWindow
          largeImageURL={modalSorse}
          tags={modalTxt}
          onModalClose={onModalClose}
        ></ModalWindow>
      )}
      {errorMessage && <Toaster message={errorMessage} />}
    </Layout>
  );
};
