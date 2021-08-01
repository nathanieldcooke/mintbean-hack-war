import React, { useState, useEffect } from 'react';
import Card from './Card';

const SideBoard = ( {boardId, score, deck, stack, clickedBatBtn, moves, sendMoves, battleBtn} ) => {
    return (
        <div id={`${boardId}`}>
            <div className='score'>
                <div>
                    <span>Score: <span>{score}</span></span>
                </div>
                <div>
                    <span>Deck: <span>{boardId === 'right-board'  ? deck?.length : 52 - deck?.length}</span>/52</span>
                </div>
                {battleBtn ? 
                <button
                    id='battle-btn'
                    className={moves[0] && moves[1] && moves[2] && !clickedBatBtn ? 'active' : 'inactive'}
                    onClick={sendMoves}
                    disabled={!(moves[0] && moves[1] && moves[2])}
                >Battle</button>
                : 
                null
                }
            </div>
            <Card imgName={stack} />
        </div>
    )
}

export default SideBoard;