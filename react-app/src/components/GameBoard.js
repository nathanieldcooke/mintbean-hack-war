import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
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
    
    // game values 
    let [score, setScore] = useState(1000)
    let [deck, setDeck] = useState([])

    useEffect(() => {
        console.log(gameState)
        if (gameState[`player${pNum}`]) {
            let playerState = gameState[`player${pNum}`]
            setScore(playerState.score)
            setDeck(playerState.deck)
        }

    }, [gameState])

    // const updateGame = () => {
    //     console.log('UPDATE GAME')
    // }

    useEffect(() => {
        // create websocket
        socket = io();
        // listen for chat events
        socket.on(code, (gameState) => {
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

    

    return (
        <div>
            <button
                onClick={sendMoves}
            >Submit</button>
            <div>
                <div>Score: {score}</div>
                <div>Num Cards: {deck.length}</div>
                <div>Cards To Play: {deck.slice(0, 3).join(' ')} </div>
                <input
                    placeholder={'card1'}
                    value={card1}
                    onChange={(e) => setCard1(e.target.value)}
                />
                <input
                    placeholder={'card2'}
                    value={card2}
                    onChange={(e) => setCard2(e.target.value)}
                />
                <input
                    placeholder={'card3'}
                    value={card3}
                    onChange={(e) => setCard3(e.target.value)}
                />
            </div>
        </div>
    );
}

export default GameBoard;