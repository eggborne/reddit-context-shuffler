import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  return (
    <div id='header'>
      Reddit Context Shuffler
      <div id='hamburger'>
        <div className='hamburger-bar'></div>
        <div className='hamburger-bar'></div>
        <div className='hamburger-bar'></div>
      </div>
    </div>
  );
}

Header.propTypes = {

};


export default Header;