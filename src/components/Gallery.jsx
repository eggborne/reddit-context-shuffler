import React from 'react';
import PropTypes from 'prop-types';

function Gallery(props) {
  return (
    <div id='gallery'>
      {props.imageArray.map((imageUrl, i) => {
        return (
          <div className='post-display' key={i}>
            <img className='post-image' src={imageUrl}></img>

            <div className='post-caption'>
              {props.captionArray[i]}
            </div>
            
          </div>
        );
      })}
    </div>
  );
}

Gallery.propTypes = {
  imageArray: PropTypes.array,
  captionArray: PropTypes.array
};


export default Gallery;