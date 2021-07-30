import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Card from './Card.js'
import './GameBoard.css'
// import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';

// outside of your component, initialize the socket variable
let socket;

const GameBoard = () => {
    // game init code
    let { code, pNum } = useParams()
    let [moves, setMoves] = useState([])
    let [gameState, setGameState] = useState({})

    // cards being played
    let [card1, setCard1] = useState('')
    let [card2, setCard2] = useState('')
    let [card3, setCard3] = useState('')  

    let [eCard1, setECard1] = useState('')
    let [eCard2, setECard2] = useState('')
    let [eCard3, setECard3] = useState('')
    
    // game values 
    let [eScore, setEScore] = useState(1000)
    let [score, setScore] = useState(1000)
    let [deck, setDeck] = useState([])

    useEffect(() => {
        console.log(gameState)
        if (gameState[`player${pNum}`] && !gameState[`player${pNum == 1 ? 2 : 1}`]) {
            startGame()
        } else {
            // handle game move

            // show recent play
            // showLastPlay()
            // setGame for next play 
            setNextGame()
        }

    }, [gameState])

    const setNextGame = () => {
        let playerState = gameState[`player${pNum}`]
        setScore(playerState?.score)
        setDeck(playerState?.deck)
        let c1, c2, c3
        if (playerState?.deck) [c1, c2, c3] = playerState?.deck.slice(0, 3)
        console.log(c1, c2, c3)
        setCard1(c1)
        setCard2(c2)
        setCard3(c3)
    }

    const startGame = () => {
        let playerState = gameState[`player${pNum}`]
        setScore(playerState.score)
        setDeck(playerState.deck)
        let [c1, c2, c3] = playerState.deck.slice(0, 3)
        console.log(c1, c2, c3)
        setCard1(c1)
        setCard2(c2)
        setCard3(c3)
    }

    // const updateGame = () => {
    //     console.log('UPDATE GAME')
    // }

    useEffect(() => {
        // create websocket
        socket = io();
        // listen for chat events
        socket.on(`${code}-${pNum}`, (gameState) => {
            // when we recieve a chat, add it into our messages array in state
            setGameState(gameState)
            // console.log(gameState)
        })
        // console.log(moves)
        socket.emit("games", { pNum: pNum, 'game_id': code, moves })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [code])


    const sendMoves = () => {
        // e.preventDefault()
        let moves = [card1, card2, card3]
        setMoves(moves)

        socket.emit("games", { pNum: pNum, 'game_id': code, moves})
    }

    const setPosition = (mIdx, card) => {

        let dupMoves = moves.slice(0);

        dupMoves[mIdx] = card;

        setMoves(dupMoves)

        // console.log(moves)
    }

    

    return (
        <div id='board'>
            <div id='left-board'>
                <div className='score'>
                    <div>
                        <span>Score: <span>{eScore}</span></span>
                    </div>
                    <div>
                        <span>Deck: <span>{52 - deck?.length}</span>/52</span>
                    </div>
                </div>
                <Card imgName={"card-back"} />
            </div>

            <div id='center-board'>
                <div id='center-top'>
                    <div className='card-spot'>
                        <Card imgName={eCard1 === '' ? 'joker' : eCard1} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                    <div className='card-spot'>
                        <Card imgName={eCard2 === '' ? 'joker' : eCard2} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                    <div className='card-spot'>
                        <Card imgName={eCard3 === '' ? 'joker' : eCard3} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                </div>
                <div id='center-center'>
                    <div>
                        <Card imgName={'play_b_1'}/>
                        <Card imgName={'play_b_2'} />
                        <Card imgName={'play_b_3'} />
                    </div>
                    <div>
                        <Card imgName={'play_b_1'} />
                        <Card imgName={'play_b_2'} />
                        <Card imgName={'play_b_3'} />
                    </div>
                </div>
                <div id='center-bottom'>
                    <div className='card-spot'>
                        <div className='buttons'>
                            <button
                                onClick={() => setPosition(0, card1)}
                            >1</button>
                            <button
                                onClick={() => setPosition(1, card1)}
                            >2</button>
                            <button
                                onClick={() => setPosition(2, card1)}
                            >3</button>
                        </div>
                        <Card imgName={card1 === '' ? 'card-back' : card1} />
                    </div>
                    <div className='card-spot'>
                        <div className='buttons'>
                            <button
                                onClick={() => setPosition(0, card2)}
                            >1</button>
                            <button
                                onClick={() => setPosition(1, card2)}
                            >2</button>
                            <button
                                onClick={() => setPosition(2, card2)}
                            >3</button>
                        </div>
                        <Card imgName={card2 === '' ? 'card-back' : card2} />
                    </div>
                    <div className='card-spot'>
                        <div className='buttons'>
                            <button
                                onClick={() => setPosition(0, card3)}
                            >1</button>
                            <button
                                onClick={() => setPosition(1, card3)}
                            >2</button>
                            <button
                                onClick={() => setPosition(2, card3)}
                            >3</button>
                        </div>
                        <Card imgName={card3 === '' ? 'card-back' : card3} />
                    </div>
                </div>
            </div>

            <div id='right-board'>
                <div className='score'>
                    <div>
                        <span>Score: <span>{score}</span></span>
                    </div>
                    <div>
                        <span>Deck: <span>{deck?.length}</span>/52</span>
                    </div>
                    <button 
                        onClick={sendMoves}
                        disabled={!moves[0] || !moves[1] || !moves[2]} 
                    >Battle</button>
                </div>
                <Card imgName={"card-back"}/>
            </div>
        </div>
    );
}

export default GameBoard;