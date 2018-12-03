import React from 'react';
import PropTypes from 'prop-types';

function Hamburger(props) {
  return (
    <div onClick={props.onClickHamburger} id='hamburger'>
      <div className='hamburger-bar' id='hamburger-bar-1'></div>
      <div className='hamburger-bar' id='hamburger-bar-2'></div>
      <div className='hamburger-bar' id='hamburger-bar-3'></div>
    </div>
  );
}

Hamburger.propTypes = {
  onClickHamburger: PropTypes.function
};


export default Hamburger;




