import React from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';

import { setHeaderSearchHover } from '../../reducers/ThemeOptions';

const HeaderSearch = (props) => {
  const { headerSearchHover, setHeaderSearchHover } = props;

  const toggleHeaderSearchHover = () => {
    setHeaderSearchHover(!headerSearchHover);
  };

  return (
    <>
      <div className="header-search-wrapper">
        <div
          className={clsx('search-wrapper', {
            'is-active': headerSearchHover
          })}>
          <label
            className="icon-wrapper text-black"
            htmlFor="header-search-input">
            <FontAwesomeIcon icon={['fas', 'search']} />
          </label>
          <input
            onFocus={toggleHeaderSearchHover}
            onBlur={toggleHeaderSearchHover}
            className="form-control"
            id="header-search-input"
            name="header-search-input"
            placeholder="Search terms..."
            type="search"
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  headerSearchHover: state.ThemeOptions.headerSearchHover
});

const mapDispatchToProps = (dispatch) => ({
  setHeaderSearchHover: (enable) => dispatch(setHeaderSearchHover(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch);
