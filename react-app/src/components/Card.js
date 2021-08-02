import React, { useContext, useEffect, useState } from 'react';
import { FadeContext } from './FadeContext';
import FadeIn from './FadeIn';
import FadeOut from './FadeOut';

const Card = ({backImg, imgName }) => {

    const fadeContext = useContext(FadeContext)

    let fade = fadeContext.fade.boolean
    let type = fadeContext.fade.type

    // let time = fade ? 2500 : 0;

    // console.log('FADE:   ',fade, type)

    return (
        <div className='card'
            style={{backgroundImage: `url(../../img/${backImg}.png)`}}
        >
        {
        !fade
        ?
        <img
            alt={`${imgName}=${backImg}`}
            src={`../../img/${imgName}.png`}
            height='100%' />
        :
            type === 'F' || type === 'B'
            ?
            <FadeIn key={`${imgName}-f`} duration={2500}>
            <img     
                alt={`${imgName}=${backImg}`} 
                src={`../../img/${imgName}.png`} 
                height='100%' />
            </FadeIn>
            :
            <FadeIn key={`${imgName}-b`} duration={2500}>
                <img
                    alt={`${imgName}=${backImg}`}
                    src={`../../img/${imgName}.png`}
                    height='100%' />
            </FadeIn>
            // <FadeOut key={`${imgName}-b`} duration={2500}>
            // <img
            //     alt={`${imgName}=${backImg}`}
            //     src={`../../img/${imgName}.png`}
            //     height='100%' />
            // </FadeOut>
        }
        </div>
    )
}

export default Card;