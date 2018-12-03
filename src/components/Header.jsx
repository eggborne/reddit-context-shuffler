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
      <form onSubmit={props.onClickReload} autoComplete='off'>
        <div id='header-lower-area'>
          <div className='input-area'>
            <input list='image-sources' id='image-source-input' type='text' name="reddit-source" placeholder='image source'></input>
            <button form='none' id='random-image-button' onClick={props.onClickRandomImageSource} className='random-button'>Random</button>
          </div>
          <div className='input-area'>
            <input list='comment-sources' id='comment-source-input' type='text' name="reddit-source" placeholder='comment source'></input>
            <button form='none' id='random-comment-button' onClick={props.onClickRandomCommentSource} className='random-button'>Random</button>
          </div>
          <datalist id='image-sources'>
            <option value='hmmm' />
            <option value='catsstandingup' />
            <option value='aww' />
            <option value='wtf' />
            <option value='doggos' />
            <option value='mildlyinteresting' />
            <option value='trashy' />
            <option value='retrogaming' />
            <option value='motorcycles' />
            <option value='squaredcircle' />
          </datalist>
          <datalist id='comment-sources'>
            <option value='gonewild' />
            <option value='hotasianmilfs' />
            <option value='chocolatemilf' />
            <option value='pantyhose' />
            <option value='cameltoe' />
            <option value='hungrybutts' />
            <option value='boltedondicks' />
            <option value='celebcumsluts' />
            <option value='ass' />
          </datalist>
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