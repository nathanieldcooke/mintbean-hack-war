import React, { useState, useEffect, useContext } from 'react';
import { FadeContext } from './FadeContext.js';
import { io } from 'socket.io-client';
import Card from './Card.js'
import './GameBoard.css'

import SideBoard from './SideBoard.js'
import PlayerCardArea from './PlayerCardArea.js'

let socket;

const GameBoard = ({code, pNum, activeGame, resetGame, compPlayer}) => {

    const fadeContext = useContext(FadeContext)

    // player lose handlers
    const [p1DLose, setP1DLose] = useState(false)
    const [p2DLose, setP2DLose] = useState(false)
    const [p1SLose, setP1SLose] = useState(false)
    const [p2SLose, setP2SLose] = useState(false)


    const [servedCards, setServedCards] = useState(false)
    let [moves, setMoves] = useState([])
    let [gameState, setGameState] = useState({})
    let [clickedBtns, setClickedBtns] = useState([])
    let [clickedBatBtn, setClickedBatBtn] = useState(false)
    let [battle1, setBattle1] = useState('')
    let [battle2, setBattle2] = useState('')
    let [battle3, setBattle3] = useState('')

    // cards being played Top and Bottom
    let [card1, setCard1] = useState('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png')
    let [card1Fade, serCard1Fade] = useState(true)

    let [card2, setCard2] = useState('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png')
    let [card3, setCard3] = useState('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png')  

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
    let [myStack, setMyStack] = useState('https://warbattleof3cards.s3.us-west-1.amazonaws.com/card-back.png')
    let [eStack, setEStack] = useState('https://warbattleof3cards.s3.us-west-1.amazonaws.com/card-back.png')


    useEffect(() => {
        if (gameState[`player${pNum}`] && gameState[`player${pNum === '1' ? 2 : 1}`]) {
            gameStepper() // runs animated card sequence, base on latest play by players
        } else if (gameState[`player${pNum}`] && !moves.length) {
            serveCards() // runs animated card sequece to start game
        }

    }, [gameState])

    useEffect(() => {
        if (activeGame) {
            // create websocket
            socket = io();
            // listen for chat events
            socket.on(`${code}-${pNum}`, (gameState) => {
                // when we recieve a gameState, upate gameState(is a snap shot of game in backend)
                setGameState(gameState)
            })
            socket.emit("games", { pNum: pNum, 'game_id': code, moves, compPlayer: compPlayer })
            // when component unmounts, disconnect
            return (() => {
                socket.disconnect()
            })
        }
    }, [activeGame])


    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const gameOver = async () => {
        let num = gameState['over'][1]
        if (gameState['over'] === 'p1 deck lose') {
            if (pNum === num) {
                setP1DLose('You Lose!!!')
            } else {
                setP1DLose('You Win!!!')
            }
        } else if (gameState['over'] === 'p1 score lose') {
            if (pNum === num) {
                setP1SLose('You Lose!!!')
            } else {
                setP1SLose('You Win!!!')
            }
        } else if (gameState['over'] === 'p2 deck lose') {
            if (pNum === num) {
                setP2DLose('You Lose!!!')
            } else {
                setP2DLose('You Win!!!')
            }
        } else if (gameState['over'] === 'p2 score lose') {
            if (pNum === num) {
                setP2SLose('You Lose!!!')
            } else {
                setP2SLose('You Win!!!')
            }
        }
    }

    const gameStepper = async () => {
        setMoves([])
        clickedBtns.forEach(node => node.classList.remove('red'))
        setClickedBtns([])

        await moveCardsToBattle()
        await moveCardsToWinnerDeck() 

        if (gameState['over']) {
            gameOver()
            await sleep(3000)
            resetGame()
            setP1DLose(false)
            setP1SLose(false)
            setP2DLose(false)
            setP2SLose(false)

        } else {
            await serveCards()
            setClickedBatBtn(false)
        }

    }

    const serveCards = async () => {
        await sleep(2000)

        let playerState = gameState[`player${pNum}`]
        let c1, c2, c3
        if (playerState?.deck) [c1, c2, c3] = playerState?.deck.slice(0, 3)
        setDeck(playerState.deck)

        let ePlayer = gameState[`player${pNum === '1' ? 2 : 1}`]
        setScore(playerState.score)
        setEScore(ePlayer ? ePlayer.score : eScore)

        fadeContext.fade.boolean = true
        fadeContext.fade.type = 'F'
        await sleep(1500)
        setCard1(c1)
        setECard3('https://warbattleof3cards.s3.us-west-1.amazonaws.com/joker.png')


        await sleep(1500)
        setCard2(c2)
        setECard2('https://warbattleof3cards.s3.us-west-1.amazonaws.com/joker.png')


        await sleep(1500)
        setCard3(c3)
        setECard1('https://warbattleof3cards.s3.us-west-1.amazonaws.com/joker.png')

        setServedCards(true)

    }

    const moveCardsToWinnerDeck = async () => {
        await sleep(2000)
        let playerHand = gameState[`player${pNum}`].curr_play
        let ePlayerHand = gameState[`player${pNum === '1' ? 2 : 1}`].curr_play

        let winLose = gameState['winLose']
        let countOf1 = winLose?.filter(num => 1 === num).length
        let countOf2 = winLose?.filter(num => 2 === num).length

        let winStack = null 

        if (countOf1 > countOf2) { // player1 wins battle
            if (pNum === '1')  {
                winStack = setMyStack
            } else {
                winStack = setEStack
            }
        } else { // player2 wins battle
            if (pNum === '2') {
                winStack = setMyStack
            } else {
                winStack = setEStack
            }
        }

        fadeContext.fade.boolean = false
        await sleep(500)
        winStack(playerHand[0])
        aSetCard1('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_1.png')


        await sleep(500)
        winStack(ePlayerHand[0])
        aESetECard1('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_1.png')

        await sleep(500)
        winStack(playerHand[1])
        aSetCard2('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_2.png')


        await sleep(500)
        winStack(ePlayerHand[1])
        aESetECard2('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_2.png')


        await sleep(500)
        winStack(playerHand[2])
        aSetCard3('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_3.png')


        await sleep(500)
        winStack(ePlayerHand[2])
        aESetECard3('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_3.png')

        await sleep(500)
        winStack('https://warbattleof3cards.s3.us-west-1.amazonaws.com/card-back.png')
    }

    const moveCardsToBattle = async () => {

        let playerHand = gameState[`player${pNum}`].curr_play
        let ePlayerHand = gameState[`player${pNum === '1' ? 2 : 1}`].curr_play

        
        for (let card of [card1, card2, card3]) {
            
            let cIdx = playerHand.indexOf(card)
            
            await sleep(1000)
            fadeContext.fade.type = 'B'
            if (card === card1) setCard1('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png');
            if (card === card2) setCard2('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png');
            if (card === card3) setCard3('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png');

            await sleep(1000)
            fadeContext.fade.type = 'F'
            if (cIdx === 0) aSetCard1(playerHand[cIdx]);
            if (cIdx === 1) aSetCard2(playerHand[cIdx]);
            if (cIdx === 2) aSetCard3(playerHand[cIdx]);
        }


        await sleep(1000)
        fadeContext.fade.type = 'B'
        setECard1('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png')
        setECard2('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png')
        setECard3('https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b.png')

        await sleep(1000)

        fadeContext.fade.type = 'F'
        aESetECard1('https://warbattleof3cards.s3.us-west-1.amazonaws.com/joker.png')
        aESetECard2('https://warbattleof3cards.s3.us-west-1.amazonaws.com/joker.png')
        aESetECard3('https://warbattleof3cards.s3.us-west-1.amazonaws.com/joker.png')

        let strArrOfWL = gameState.winLose.map(num => {
            if (num === 0) {
                return 'tie'
            } else if (num === 1 && pNum === '1') {
                return 'win'
            } else if (num === 2 && pNum === '2') {
                return 'win'
            } else {
                return 'lose'
            }

        })

        await sleep(1500)
        aESetECard1(ePlayerHand[0])
        setBattle1(strArrOfWL[0])

        await sleep(1500)
        aESetECard2(ePlayerHand[1])
        setBattle2(strArrOfWL[1])

        await sleep(1500)
        aESetECard3(ePlayerHand[2])
        setBattle3(strArrOfWL[2])

        await sleep(1500)
        setBattle1('')
        setBattle2('')
        setBattle3('')


    }



    const sendMoves = () => {
        setServedCards(false)
        setClickedBatBtn(true)

        socket.emit("games", { pNum: pNum, 'game_id': code, moves, compPlayer})
    }

    const setPosition = (e, mIdx, card) => {
        e.target.classList.add('red')
        setClickedBtns(clickedBtns.concat([e.target]))
        let dupMoves = moves.slice(0);

        dupMoves[mIdx] = card;

        setMoves(dupMoves)
    }

    const isDisabled = (idx, card) => {
        if (card === card1 && moves.includes(card)) {
            return moves[idx] !== card
        } else if (card === card2 && moves.includes(card)) {
            return moves[idx] !== card
        } else if (card === card3 && moves.includes(card)) {
            return moves[idx] !== card
        }
        return moves[idx]
    }

    

    return (
        <>
            {p1DLose && <div className='show-win-lose'>{p1DLose}</div>}
            {p1SLose && <div className='show-win-lose'>{p1SLose}</div>}
            {p2DLose && <div className='show-win-lose'>{p2DLose}</div>}
            {p2SLose && <div className='show-win-lose'>{p2SLose}</div>}

            <div id='board'>
                <SideBoard 
                    boardId='left-board' 
                    score={eScore} 
                    deck={deck} 
                    stack={myStack} 
                />
                <div id='center-board'>
                    <PlayerCardArea 
                        centerTB='center-top' 
                        eCard1={eCard1} eCard2={eCard2} eCard3={eCard3} 
                        card1={card1} card2={card2} card3={card3} 
                        isDisabled={isDisabled} 
                        setPosition={setPosition}
                        servedCards={servedCards}
                        setServedCards={setServedCards} 
                    />
                    <div id='center-center'>
                        <div>
                            <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_1.png'} imgName={aECard1 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_1.png' : aECard1} />
                            <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_2.png'} imgName={aECard2 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_2.png' : aECard2} />
                            <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_3.png'} imgName={aECard3 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_3.png' : aECard3} />
                        </div>
                        <div>
                            {battle1 === '' && <span style={{opacity: '0'}}>nan</span>}
                            {battle1 === 'win' && <span style={{color: 'rgb(0, 187, 255)'}}>Win</span>}
                            {battle1 === 'lose' && <span style={{color: 'red'}}>Lose</span>}
                            {battle1 === 'tie' && <span style={{color: 'yellow'}}>Tie</span>}

                            {battle2 === '' && <span style={{opacity: '0'}}>nan</span>}
                            {battle2 === 'win' && <span style={{color: 'rgb(0, 187, 255)'}}>Win</span>}
                            {battle2 === 'lose' && <span style={{color: 'red'}}>Lose</span>}
                            {battle2 === 'tie' && <span style={{color: 'yellow'}}>Tie</span>}

                            {battle3 === '' && <span style={{opacity: '0'}}>nan</span>}
                            {battle3 === 'win' && <span style={{color: 'rgb(0, 187, 255)'}}>Win</span>}
                            {battle3 === 'lose' && <span style={{color: 'red'}}>Lose</span>}
                            {battle3 === 'tie' && <span style={{color: 'yellow'}}>Tie</span>}

                        </div>
                        <div>
                            <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_1.png'} fade={card1Fade} imgName={aCard1 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_1.png' : aCard1} />
                            <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_2.png'} imgName={aCard2 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_2.png' : aCard2} />
                            <Card backImg={'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_3.png'} imgName={aCard3 === '' ? 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/play_b_3.png' : aCard3} />
                        </div>
                    </div>
                    <PlayerCardArea centerTB='center-bottom' 
                        eCard1={eCard1} eCard2={eCard2} eCard3={eCard3} 
                        card1={card1} card1Fade={card1Fade} card2={card2} card3={card3} 
                        isDisabled={isDisabled} 
                        setPosition={setPosition}
                        servedCards={servedCards}
                        setServedCards={setServedCards} 
                    />
                </div>
                <SideBoard 
                    boardId='right-board' 
                    score={score} 
                    deck={deck} 
                    stack={eStack} 
                    clickedBatBtn={clickedBatBtn} 
                    moves={moves} 
                    sendMoves={sendMoves} 
                    battleBtn={true} 
                    setServedCards
                />
            </div>
        </>
    );
}

export default GameBoard;