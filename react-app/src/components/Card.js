import React, { useContext, useEffect, useState } from 'react';
import { FadeContext } from './FadeContext';
import FadeIn from './FadeIn';

const Card = ({backImg, imgName }) => {

    const fadeContext = useContext(FadeContext)

    let fade = fadeContext.fade.boolean

    let time = fade ? 2500 : 0;

    console.log('FADE:   ',fade, imgName)

    return (
        <div className='card'
            style={{backgroundImage: `url(../../img/${backImg}.png)`}}
        >
            <FadeIn key={`${imgName}`} duration={time}>
            <img     
                alt={`${imgName}=${backImg}`} 
                src={`../../img/${imgName}.png`} 
                height='100%' />
            </FadeIn>
        </div>
    )
}

export default Card;