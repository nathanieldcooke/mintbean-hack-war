import React, { useState, useEffect } from 'react';
import Card from './Card';
import FadeIn from './FadeIn';

const PlayerCardArea = ({ centerTB, eCard1, eCard2, eCard3, card1, card1Fade, card2, card3, isDisabled, setPosition }) => {
    return (
        <>
            {centerTB === 'center-top'
            ?
                <div id='center-top'>
                    <div className='card-spot'>
                        <Card backImg={'play_b'} imgName={eCard1 === '' ? 'play_b' : eCard1} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                    <div className='card-spot'>
                        <Card backImg={'play_b'} imgName={eCard2 === '' ? 'play_b' : eCard2} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                    <div className='card-spot'>
                        <Card backImg={'play_b'} imgName={eCard3 === '' ? 'play_b' : eCard3} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                </div>
            :
                <div id='center-bottom'>
                    <div className='card-spot'>
                        <div className='buttons'>
                            <button
                                className={isDisabled(0, card1) ? 'inactive' : 'active'}
                                disabled={isDisabled(0, card1)}
                                onClick={(e) => setPosition(e, 0, card1)}
                            >1</button>
                            <button
                                className={isDisabled(1, card1) ? 'inactive' : 'active'}
                                disabled={isDisabled(1, card1)}
                                onClick={(e) => setPosition(e, 1, card1)}
                            >2</button>
                            <button
                                className={isDisabled(2, card1) ? 'inactive' : 'active'}
                                disabled={isDisabled(2, card1)}
                                onClick={(e) => setPosition(e, 2, card1)}
                            >3</button>
                        </div>
                        {/* <FadeIn> */}
                            <Card key={`${card1}`} backImg={'play_b'} fade={card1Fade} imgName={card1 === '' ? 'play_b' : card1}/>
                        {/* </FadeIn> */}
                    </div>
                    <div className='card-spot'>
                        <div className='buttons'>
                            <button
                                className={isDisabled(0, card2) ? 'inactive' : 'active'}
                                disabled={isDisabled(0, card2)}
                                onClick={(e) => setPosition(e, 0, card2)}
                            >1</button>
                            <button
                                className={isDisabled(1, card2) ? 'inactive' : 'active'}
                                disabled={isDisabled(1, card2)}
                                onClick={(e) => setPosition(e, 1, card2)}
                            >2</button>
                            <button
                                className={isDisabled(2, card2) ? 'inactive' : 'active'}
                                disabled={isDisabled(2, card2)}
                                onClick={(e) => setPosition(e, 2, card2)}
                            >3</button>
                        </div>
                        <Card backImg={'play_b'} imgName={card2 === '' ? 'play_b' : card2} />
                    </div>
                    <div className='card-spot'>
                        <div className='buttons'>
                            <button
                                className={isDisabled(0, card3) ? 'inactive' : 'active'}
                                disabled={isDisabled(0, card3)}
                                onClick={(e) => setPosition(e, 0, card3)}
                            >1</button>
                            <button
                                className={isDisabled(1, card3) ? 'inactive' : 'active'}
                                disabled={isDisabled(1, card3)}
                                onClick={(e) => setPosition(e, 1, card3)}
                            >2</button>
                            <button
                                className={isDisabled(2, card3) ? 'inactive' : 'active'}
                                disabled={isDisabled(2, card3)}
                                onClick={(e) => setPosition(e, 2, card3)}
                            >3</button>
                        </div>
                        <Card backImg={'play_b'} imgName={card3 === '' ? 'play_b' : card3} />
                    </div>
                </div>
            }
        </>
    )
}

export default PlayerCardArea;