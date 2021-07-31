import React from 'react';

const Card = ({ imgName }) => {
    return (
        <div className='deck'><img alt={`${imgName}`} src={`../../img/${imgName}.png`} height='100%' /></div>
    )
}

export default Card;