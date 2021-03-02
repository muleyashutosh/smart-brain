import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ OnInputChange, OnButtonClick }) => {
    return (
       <div>
           <p className='white f4'>
                {'This Magic brain will detect faces in your pictures. Give it a try'} 
           </p>
           <div className='centerContent ph3'>
                <div className="form pa4 br3 shadow-5 centerContent">
                    <input 
                        className='f4 pa2 w-70 center' 
                        type="text" 
                        onChange={OnInputChange}
                    />
                    <button 
                        className='w-30 f4 grow bw0 ph3 pv2 dib white bg-light-purple'
                        onClick={OnButtonClick}
                    >Detect</button>
                </div>
           </div>
       </div>
    )
}

export default ImageLinkForm;
