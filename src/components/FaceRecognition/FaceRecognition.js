import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ ImageUrl, Box }) => {
  return (
    <div className='centerContent ma'>
      <div className="imageBox absolute mt2">
        <img
          id='inputImage'
          width='400px'
          height='auto'
          src={ImageUrl}
          alt=""
        />
        {
          Box.map((region, i) => {
            return (
              <div
                key={i}
                className="bounding-box"
                style={{
                  top: region.top,
                  left: region.left,
                  right: region.right,
                  bottom: region.bottom
                }}
              ></div>
            )
          })
        }
      </div>
    </div>
  )
}

export default FaceRecognition;
