import React from 'react';
import Card from './Card';

const PlayerCardArea = ({ centerTB, eCard1, eCard2, eCard3, card1, card1Fade, card2, card3, isDisabled, setPosition, servedCards }) => {


    return (
        <>
            {centerTB === 'center-top'
            ?
                <div id='center-top'>
                    <div className='card-spot'>
                        <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png'} imgName={eCard1 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png' : eCard1} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                    <div className='card-spot'>
                        <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png'} imgName={eCard2 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png' : eCard2} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                    <div className='card-spot'>
                        <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png'} imgName={eCard3 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png' : eCard3} />
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
                                className={!servedCards || isDisabled(0, card1) ? 'inactive' : 'active'}
                                disabled={!servedCards || isDisabled(0, card1)}
                                onClick={(e) => setPosition(e, 0, card1)}
                            >1</button>
                            <button
                                className={!servedCards || isDisabled(1, card1) ? 'inactive' : 'active'}
                                disabled={!servedCards || isDisabled(1, card1)}
                                onClick={(e) => setPosition(e, 1, card1)}
                            >2</button>
                            <button
                                className={!servedCards || isDisabled(2, card1) ? 'inactive' : 'active'}
                                disabled={!servedCards || isDisabled(2, card1)}
                                onClick={(e) => setPosition(e, 2, card1)}
                            >3</button>
                        </div>
                            <Card key={`${card1}`} backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png'} fade={card1Fade} imgName={card1 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png' : card1}/>
                    </div>
                    <div className='card-spot'>
                        <div className='buttons'>
                            <button
                                className={!servedCards || isDisabled(0, card2) ? 'inactive' : 'active'}
                                disabled={!servedCards || isDisabled(0, card2)}
                                onClick={(e) => setPosition(e, 0, card2)}
                            >1</button>
                            <button
                                className={!servedCards || isDisabled(1, card2) ? 'inactive' : 'active'}
                                disabled={!servedCards || isDisabled(1, card2)}
                                onClick={(e) => setPosition(e, 1, card2)}
                            >2</button>
                            <button
                                className={!servedCards || isDisabled(2, card2) ? 'inactive' : 'active'}
                                disabled={!servedCards || isDisabled(2, card2)}
                                onClick={(e) => setPosition(e, 2, card2)}
                            >3</button>
                        </div>
                        <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png'} imgName={card2 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png' : card2} />
                    </div>
                    <div className='card-spot'>
                        <div className='buttons'>
                            <button
                                className={!servedCards || isDisabled(0, card3) ? 'inactive' : 'active'}
                                disabled={!servedCards || isDisabled(0, card3)}
                                onClick={(e) => setPosition(e, 0, card3)}
                            >1</button>
                            <button
                                className={!servedCards || isDisabled(1, card3) ? 'inactive' : 'active'}
                                disabled={!servedCards || isDisabled(1, card3)}
                                onClick={(e) => setPosition(e, 1, card3)}
                            >2</button>
                            <button
                                className={!servedCards || isDisabled(2, card3) ? 'inactive' : 'active'}
                                disabled={!servedCards || isDisabled(2, card3)}
                                onClick={(e) => setPosition(e, 2, card3)}
                            >3</button>
                        </div>
                        <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png'} imgName={card3 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png' : card3} />
                    </div>
                </div>
            }
        </>
    )
}

export default PlayerCardArea;