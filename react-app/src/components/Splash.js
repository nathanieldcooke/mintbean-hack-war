import React, { useState, useEffect } from 'react';
import './Splash.css'

const Splash = ({splashOpen, setSplashOpen, open, setOpen, activeGame}) => {
    const [splashSlide, setSplashSlide] = useState(true)
    const [rulesSlide, setRulesSlide] = useState(false)
    const [aboutMeSlide, setAboutMeSlide] = useState(false)
    const [backImg, setBackImg] = useState('https://warbattleof3cards.s3.us-west-1.amazonaws.com/splash_wb.jpg')

    const startGame = () => {
        setSplashOpen(true)
        setOpen(false)
    }

    const toRules = () => {
        setSplashSlide(false)
        setAboutMeSlide(false)

        setRulesSlide(true)
        setBackImg('https://warbattleof3cards.s3.us-west-1.amazonaws.com/game-rule.png')
    }

    const fromRules = () => {
        setRulesSlide(false)

        setSplashSlide(true)
        setBackImg('https://warbattleof3cards.s3.us-west-1.amazonaws.com/splash_wb.jpg')
    }

    const toAboutMe = () => {
        setSplashSlide(false)
        setRulesSlide(false)

        setAboutMeSlide(true)
        setBackImg('https://warbattleof3cards.s3.us-west-1.amazonaws.com/me-comp-back.jpeg')
    }

    const fromAboutMe = () => {
        setAboutMeSlide(false)
        
        setSplashSlide(true)
        setBackImg('https://warbattleof3cards.s3.us-west-1.amazonaws.com/splash_wb.jpg')
    }

    const splashComp = (
        <div id={'splash-comp'}>
            <div><span id='war-span'>War</span></div>
            <div><span id='bat-span' >battleOf<span>3</span>'s</span></div>
            <div><span id='line-span' >Where Luck Meets Reading Your Opponent</span></div>
            <div id={'div-splash-comp'}>
                <button
                    onClick={toRules}
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
                <button
                    onClick={toAboutMe}
                >About Dev</button>
            </div>
        </div>
    )

    const rulesComp = (
        <div id={'rules-comp'}>
            <div id={'div-splash-comp'} className='rules'>
                    <button
                        onClick={fromRules}
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
                <button
                    onClick={toAboutMe}
                >About Dev</button>
            </div>
        </div>
    )

    const aboutMeComp = (
        <div id={'me-comp'}>
            {/* <div id='profile-img' style={{backgroundImage: `url('../../img/profile_img.jpg')`}}></div> */}
            <div>

                <div id='pro-img'><img src='../../img/profile_img.jpg' /></div>
                <div id='about-me-text'>
                    <span id='me-title'>Nathaniel Cooke</span>
                    <span id='me-icons'>
                        <span
                            onClick={() => window.open(`https://github.com/nathanieldcooke`, '_blank', 'noopener noreferrer')}
                        ><i className="fab fa-github"></i></span>
                        <span
                            onClick={() => window.open(`https://www.linkedin.com/in/nathaniel-cooke-257a1363/`, '_blank', 'noopener noreferrer')}
                        ><i className="fab fa-linkedin"></i></span>
                        <span
                            onClick={() => window.open(`https://nathanieldcooke.github.io/`, '_blank', 'noopener noreferrer')}
                        ><i className="fas fa-folder-open"></i></span>
                    </span>
                    <div id='about-me-sub-text'>
                        <span id='me-text1'>I have strong Full-Stack Web-Development experience... having built a few websites and games. I continue to grow as a developer everyday.</span>
                        <span id='me-text2'>While on this journey. I hope we can build some awesome applications together!</span>
                    </div>
                </div>
                <div id='about-me-btns' >
                    <div id={'div-splash-comp'} className='rules'>
                        <button
                            onClick={toRules}
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
                        <button
                            onClick={fromAboutMe}
                        >Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <>
            <div className='nav-container'>
            </div>
            <div style={{ backgroundImage: `url(${backImg}` }} id={'splash-div'}>
                {splashSlide && splashComp}
                {rulesSlide && rulesComp}
                {aboutMeSlide && aboutMeComp}
            </div>
        </>
    )
}

export default Splash