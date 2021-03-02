import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.svg'
const Logo = () => {
    return (
        <Tilt className="Tilt br3 pa3 ma4 mb0 mt0 shadow-5" options={{ max : 30 }} style={{ height: 125, width: 125 }} >
            <div className="Tilt-inner">
                <img alt='logo' src={brain} />
            </div>
       </Tilt>
    )
}

export default Logo;
