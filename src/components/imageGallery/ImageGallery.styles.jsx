import styled from 'styled-components';

export const Imagelist = styled.ul`
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

export const GalleryItem = styled.li`
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 6px 6px 6px 0px rgba(0, 0, 0, 0.75);
`;
