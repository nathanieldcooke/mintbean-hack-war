import React, { useState, useEffect } from 'react';
import './Splash.css'

const Splash = ({splashOpen, setSplashOpen, open, setOpen}) => {
    const [splashSlide, setSplashSlide] = useState(true)
    const [rulesSlide, setRulesSlide] = useState(false)
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
            <div>
                <button>Rules</button>
                <button
                    onClick={startGame}
                >Start Playing</button>
                <button>About Dev</button>
            </div>
        </div>
    )
    return (
        <>
            <div className='nav-container'>
            </div>
            <div style={{ backgroundImage: `url(../../img/splash_wb.jpg)` }} id={'splash-div'}>
                {splashSlide && splashComp}
            </div>
        </>
    )
}

export default Splash