import React, { useContext } from 'react';
import { FadeContext } from './FadeContext';
import FadeIn from './FadeIn';

const Card = ({backImg, imgName }) => {

    const fadeContext = useContext(FadeContext)

    let fade = fadeContext.fade.boolean
    let type = fadeContext.fade.type


    return (
        <div className='card'
            style={{backgroundImage: `url(${backImg})`}}
        >
        {
        !fade
        ?
        <img
            alt={`${imgName}=${backImg}`}
            src={`${imgName}`}
            height='100%' />
        :
            type === 'F' || type === 'B'
            ?
            <FadeIn key={`${imgName}-f`} duration={2500}>
            <img     
                alt={`${imgName}=${backImg}`} 
                src={`${imgName}`} 
                height='100%' />
            </FadeIn>
            :
            <FadeIn key={`${imgName}-b`} duration={2500}>
                <img
                    alt={`${imgName}=${backImg}`}
                    src={`${imgName}`}
                    height='100%' />
            </FadeIn>
        }
        </div>
    )
}

export default Card;