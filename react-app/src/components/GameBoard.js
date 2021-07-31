import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Card from './Card.js'
import './GameBoard.css'

import SideBoard from './SideBoard.js'

// outside of your component, initialize the socket variable
let socket;

const GameBoard = () => {
    // game init code
    let { code, pNum } = useParams()
    let [moves, setMoves] = useState([])
    let [gameState, setGameState] = useState({})
    let [clickedBtns, setClickedBtns] = useState([])
    let [clickedBatBtn, setClickedBatBtn] = useState(false)

    // cards being played Top and Bottom
    let [card1, setCard1] = useState('')
    let [card2, setCard2] = useState('')
    let [card3, setCard3] = useState('')  

    let [eCard1, setECard1] = useState('')
    let [eCard2, setECard2] = useState('')
    let [eCard3, setECard3] = useState('')
    
    // cards in battle arena
    let [aCard1, aSetCard1] = useState('')
    let [aCard2, aSetCard2] = useState('')
    let [aCard3, aSetCard3] = useState('')

    let [aECard1, aESetECard1] = useState('')
    let [aECard2, aESetECard2] = useState('')
    let [aECard3, aESetECard3] = useState('')

    // game values 
    let [eScore, setEScore] = useState(1000)
    let [score, setScore] = useState(1000)
    let [deck, setDeck] = useState([])
    let [myStack, setMyStack] = useState('card-back')
    let [eStack, setEStack] = useState('card-back')


    useEffect(() => {
        console.log(gameState)
        if (gameState[`player${pNum}`] && gameState[`player${pNum === '1' ? 2 : 1}`]) {
            gameStepper()
        } else if (gameState[`player${pNum}`]) {
            serveCards()
        }

    }, [gameState])

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


    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const gameStepper = async () => {
        setMoves([])
        clickedBtns.forEach(node => node.classList.remove('red'))
        setClickedBtns([])

        await moveCardsToBattle()
        await moveCardsToWinnerDeck()
        await serveCards()
        setClickedBatBtn(false)
    }

    const serveCards = async () => {
        await sleep(2000)
        let playerState = gameState[`player${pNum}`]
        let c1, c2, c3
        if (playerState?.deck) [c1, c2, c3] = playerState?.deck.slice(0, 3)
        setDeck(playerState.deck)
        // setClickedBatBtn(true)

        let ePlayer = gameState[`player${pNum == 1 ? 2 : 1}`]
        setScore(playerState.score)
        setEScore(ePlayer ? ePlayer.score : eScore)
        console.log(c1, c2, c3)

        setCard1(c1)
        setECard3('joker')


        await sleep(500)

        setCard2(c2)
        setECard2('joker')


        await sleep(500)


        setCard3(c3)
        setECard1('joker')

    }

    const moveCardsToWinnerDeck = async () => {
        let playerHand = gameState[`player${pNum}`].curr_play
        let ePlayerHand = gameState[`player${pNum === 1 ? 2 : 1}`].curr_play

        let winLose = gameState['winLose']
        let countOf1 = winLose?.filter(num => 1 === num).length
        let countOf2 = winLose?.filter(num => 2 === num).length

        let winStack = null 

        if (countOf1 > countOf2) { // player1 wins battle
            console.log('hello', pNum, countOf1)
            if (pNum === '1')  {
                console.log('hello1111')
                winStack = setMyStack
            } else {
                console.log('hello2222')
                winStack = setEStack
            }
            // winStack = setMyStack
        } else { // player2 wins battle
            console.log('heeeee', pNum, countOf2)
            if (pNum === '2') {
                console.log('heeOOO')
                winStack = setMyStack
            } else {
                console.log('heeEEE')
                winStack = setEStack
            }
            // winStack = setEStack
        }


        await sleep(2000)
        // let card1 = aCard1
        winStack(playerHand[0])
        aSetCard1('play_b_1')


        await sleep(500)
        // let ecard1 = aECard1
        winStack(ePlayerHand[0])
        aESetECard1('play_b_1')

        await sleep(500)
        // let card1 = aCard1
        winStack(playerHand[1])
        aSetCard2('play_b_2')


        await sleep(500)
        // let ecard1 = aECard1
        winStack(ePlayerHand[1])
        aESetECard2('play_b_2')


        await sleep(500)
        // let card1 = aCard1
        winStack(playerHand[2])
        aSetCard3('play_b_3')


        await sleep(500)
        // let ecard1 = aECard1
        winStack(ePlayerHand[2])
        aESetECard3('play_b_3')

        await sleep(500)
        // let ecard1 = aECard1
        winStack('card-back')
        // aESetECard3('card-back')
    }

    const moveCardsToBattle = async () => {
        let playerHand = gameState[`player${pNum}`].curr_play
        let ePlayerHand = gameState[`player${pNum === '1' ? 2 : 1}`].curr_play

        // console.log(playerHand, ePlayerHand)

        await sleep(2000)

        setCard1('play_b')
        setECard1('play_b')

        aSetCard1(playerHand[0])
        aESetECard1(ePlayerHand[0])

        await sleep(500)

        setCard2('play_b')
        setECard2('play_b')

        aSetCard2(playerHand[1])
        aESetECard2(ePlayerHand[1])

        await sleep(500)

        setCard3('play_b')
        setECard3('play_b')

        aSetCard3(playerHand[2])
        aESetECard3(ePlayerHand[2])

        await sleep(500)

    }



    const sendMoves = () => {
        // e.preventDefault()
        let moves = [card1, card2, card3]
        setClickedBatBtn(true)
        setMoves(moves)

        socket.emit("games", { pNum: pNum, 'game_id': code, moves})
    }

    const setPosition = (e, mIdx, card) => {
        e.target.classList.add('red')
        setClickedBtns(clickedBtns.concat([e.target]))
        // console.log(e.target)
        // e.classList.add('red')
        let dupMoves = moves.slice(0);

        dupMoves[mIdx] = card;

        setMoves(dupMoves)

        console.log(moves)
    }

    const isDisabled = (idx, card) => {
        if (card === card1 && moves.includes(card)) {
            // console.log('in', moves, idx, card)
            return moves[idx] !== card
        } else if (card === card2 && moves.includes(card)) {
            // console.log('in', moves, idx, card)
            return moves[idx] !== card
        } else if (card === card3 && moves.includes(card)) {
            // console.log('in', moves, idx, card)
            return moves[idx] !== card
        }
        // console.log('out: ', moves, idx, card)
        return moves[idx]
    }

    

    return (
        <div id='board'>

            <SideBoard boardId='left-board' score={eScore} deck={deck} stack={myStack} />

            <div id='center-board'>
                <div id='center-top'>
                    <div className='card-spot'>
                        <Card imgName={eCard1 === '' ? 'play_b' : eCard1} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                    <div className='card-spot'>
                        <Card imgName={eCard2 === '' ? 'play_b' : eCard2} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                    <div className='card-spot'>
                        <Card imgName={eCard3 === '' ? 'play_b' : eCard3} />
                        <div className='eButtons'>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                </div>
                <div id='center-center'>
                    <div>
                        <Card imgName={aECard1 === '' ? 'play_b_1' : aECard1} />
                        <Card imgName={aECard2 === '' ? 'play_b_2' : aECard2} />
                        <Card imgName={aECard3 === '' ? 'play_b_3' : aECard3} />
                    </div>
                    <div>
                        <Card imgName={aCard1 === '' ? 'play_b_1' : aCard1} />
                        <Card imgName={aCard2 === '' ? 'play_b_2' : aCard2} />
                        <Card imgName={aCard3 === '' ? 'play_b_3' : aCard3} />
                    </div>
                </div>
                <div id='center-bottom'>
                    <div className='card-spot'>
                        <div className='buttons'>
                            <button
                                className={isDisabled(0, card1) ? 'inactive': 'active'}
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
                        <Card imgName={card1 === '' ? 'play_b' : card1} />
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
                        <Card imgName={card2 === '' ? 'play_b' : card2} />
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
                        <Card imgName={card3 === '' ? 'play_b' : card3} />
                    </div>
                </div>
            </div>
            
            <SideBoard boardId='right-board' score={score} deck={deck} stack={eStack} clickedBatBtn={clickedBatBtn} moves={moves} sendMoves={sendMoves} battleBtn={true} />

        </div>
    );
}

export default GameBoard;