import React, { useState, useEffect } from 'react';
import './Splash.css'

const Splash = ({splashOpen, setSplashOpen, open, setOpen, activeGame}) => {
    const [splashSlide, setSplashSlide] = useState(true)
    const [rulesSlide, setRulesSlide] = useState(false)
    const [backImg, setBackImg] = useState('splash_wb.jpg')
    const [aboutMeSlide, setAboutMeSlide] = useState(false)

    const startGame = () => {
        setSplashOpen(true)
        setOpen(false)
    }

    const splashComp = (
        <div id={'splash-comp'}>
            <div><span id='war-span'>War</span></div>
            <div><span id='bat-span' >battleOf<span>3</span>'s</span></div>
            <div><span id='line-span' >Where Luck Meets Reading Your Opponent</span></div>
            <div id={'div-splash-comp'}>
                <button
                    onClick={() => {
                        setSplashSlide(false)
                        setRulesSlide(true)
                        setBackImg('game-rule.png')
                    }}
                >Rules</button>
                {
                activeGame
                ?
                <button 
                    id='in-game-close'
                    onClick={() => setSplashOpen(true)}
                >Close</button>
                :
                <button
                    onClick={startGame}
                >Start Playing</button>
                }   
            <button>About Dev</button>
            </div>
        </div>
    )

    const rulesComp = (
        <div id={'rules-comp'}>
            <div id={'div-splash-comp'} className='rules'>
                    <button
                        onClick={() => {
                            setSplashSlide(true)
                            setRulesSlide(false)
                            setBackImg('splash_wb.jpg')
                        }}
                    >Back</button>
                {
                    activeGame
                        ?
                        <button
                            id='in-game-close'
                            onClick={() => setSplashOpen(true)}
                        >Close</button>
                        :
                        <button
                            onClick={startGame}
                        >Start Playing</button>
                }
                <button>About Dev</button>
            </div>
        </div>
    )

    const aboutMeComp = (
        <div id={'me-comp'}>
            
        </div>
    )
    return (
        <>
            <div className='nav-container'>
            </div>
            <div style={{ backgroundImage: `url(../../img/${backImg})` }} id={'splash-div'}>
                {splashSlide && splashComp}
                {rulesSlide && rulesComp}
            </div>
        </>
    )
}

export default Splash