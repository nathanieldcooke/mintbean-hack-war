import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
// import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';

// outside of your component, initialize the socket variable
let socket;

const GameBoard = () => {

    let { code, pNum } = useParams()

    let [moves, setMoves] = useState({})

    let [gameState, setGameState] = useState({})

    useEffect(() => {
        console.log(gameState)
    }, [gameState])

    const updateGame = () => {
        console.log('UPDATE GAME')
    }

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
        setMoves(moves)

        socket.emit("games", { pNum: pNum, 'game_id': code, moves})
    }

    

    return (
        <div>
            <button>Submit</button>
        </div>
    );
}

export default GameBoard;