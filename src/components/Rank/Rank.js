import React from 'react';
import './Rank.css'

const Rank = ({Username, Entries}) => {
    return (
        <div className='white'>
            <div className='f3'>{`${Username}, your Entry Count is..`}.</div>
            <div className='f1'>{`${Entries}`}</div>
        </div>
    )
}

export default Rank;
