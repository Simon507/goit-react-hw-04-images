import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Toaster } from './Toaster';

import { useState } from 'react';
import { SearchBar } from './searchbar/SearchBar';
import { SearchQuerry } from './searchQuerry/SearchQuerry';
import { ImageGallery } from './imageGallery/ImageGallery';
import { ModalWindow } from './modal/ModalWindow';
import { LoadMore } from './loadMoreBtn/LoadMoreBtn';

export const App = () => {
  const [collections, setCollections] = useState([]);
  const [target, setTarget] = useState(null);
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSorse, setModalSorse] = useState('');
  const [modalTxt, setModalTxt] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [totalPage, setTotalPage] = useState(1);

  const onSubmit = targetSubmit => {
    console.log(targetSubmit);
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

  const onFind = (targetList, totalHits) => {
    const oldArr = collections;
    const newArr = oldArr.concat(targetList);
    setCollections(newArr);
    console.log(`TOal page: ${totalHits}`);
    setTotalPage(Math.ceil(totalHits / 12));
  };

  return (
    <Layout>
      <GlobalStyle />
      <SearchBar onSubmit={onSubmit}></SearchBar>
      <SearchQuerry target={target} onFind={onFind} page={page}></SearchQuerry>

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
