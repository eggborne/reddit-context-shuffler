import React from 'react';
import Hamburger from './Hamburger';
import PropTypes from 'prop-types';


function Header(props) {
  return (
    <div id='header'>
      <div id='header-top-row'>
        <div id='title'>Reddit Context Shuffler</div>
        <Hamburger onClickHamburger={props.onHamburgerClick} />
      </div>
      <div className='current-mix-row'>
        <div>images:</div>
        <div id='image-source-display'>
          r/{props.sources.images}
        </div>
      </div>
      <div className='current-mix-row'>
        <div>comments:</div>
        <div id='comment-source-display'>
          r/{props.sources.comments}
        </div>
      </div>
      <form onSubmit={props.onClickReload}>
        <div id='header-lower-area'>
          <div className='input-area'>
            <input id='image-source-input' type='text' name="reddit-source" placeholder='image source'></input>
            <button id='random-image-button' onClick={props.onClickRandomImageSource} className='random-button'>Random</button>
          </div>
          <div className='input-area'>
            <input id='comment-source-input' type='text' name="reddit-source" placeholder='comment source'></input>
            <button id='random-comment-button' onClick={props.onClickRandomCommentSource} className='random-button'>Random</button>
          </div>
          <button id='reload-button'>Refresh</button>
        </div>
      </form>
    </div>
  );
}

Header.propTypes = {
  sources: PropTypes.object,
  onHamburgerClick: PropTypes.function,
  onClickReload: PropTypes.function,
  onClickRandomImageSource: PropTypes.function,
  onClickRandomCommentSource: PropTypes.function
};


export default Header;