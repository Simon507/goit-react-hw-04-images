import PropTypes from 'prop-types';

import { RiFindReplaceLine } from 'react-icons/ri';
import { useState } from 'react';

import {
  FindSection,
  SearchForm,
  SearchFormBtn,
  SearchInput,
} from './SearchBar.styles';

export const SearchBar = ({ onSubmit }) => {
  const [target, setTarget] = useState('');

  const handleChange = item => {
    setTarget(item.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(target);
  };

  return (
    <FindSection className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormBtn type="submit" className="button">
          <RiFindReplaceLine></RiFindReplaceLine>
        </SearchFormBtn>

        <SearchInput
          className="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          target={target}
          onChange={handleChange}
        />
      </SearchForm>
    </FindSection>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
