import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FadeContext } from './FadeContext.js';
import { io } from 'socket.io-client';
import Card from './Card.js'
import './GameBoard.css'

import SideBoard from './SideBoard.js'
import PlayerCardArea from './PlayerCardArea.js'

// export const fadeObj = {
//     boolean: true
// }

// outside of your component, initialize the socket variable
let socket;

const GameBoard = ({code, pNum, activeGame, compPlayer}) => {

    const fadeContext = useContext(FadeContext)
    // console.log("CONTEXT: ", `${fadeContext.fade.boolean}`)
    // let obj = fadeContext.fade
    // console.log(obj.boolean = true)
    // console.log("CONTEXT: ", fadeContext.fade)

    // console.log(fadeObj)
    // fadeObj.boolean = false;
    // console.log(fadeObj)



    // game init code
    // let { code, pNum } = useParams()
    let [moves, setMoves] = useState([])
    let [gameState, setGameState] = useState({})
    let [clickedBtns, setClickedBtns] = useState([])
    let [clickedBatBtn, setClickedBatBtn] = useState(false)
    let [battle1, setBattle1] = useState('')
    let [battle2, setBattle2] = useState('')
    let [battle3, setBattle3] = useState('')
    // console.log(code, pNum, activeGame)

    // cards being played Top and Bottom
    let [card1, setCard1] = useState('')
    let [card1Fade, serCard1Fade] = useState(true)

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
            gameStepper() // runs animated card sequence, base on latest play by players
        } else if (gameState[`player${pNum}`] && !moves.length) {
            serveCards() // runs animated card sequece to start game
        }

    }, [gameState])

    useEffect(() => {
        console.log(activeGame)
        if (activeGame) {
            // create websocket
            socket = io();
            // listen for chat events
            socket.on(`${code}-${pNum}`, (gameState) => {
                // when we recieve a chat, add it into our messages array in state
                setGameState(gameState)
                // console.log(gameState)
            })
            // console.log(moves)
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

    const gameStepper = async () => {
        setMoves([])
        clickedBtns.forEach(node => node.classList.remove('red'))
        setClickedBtns([])

        await moveCardsToBattle() // this
        await moveCardsToWinnerDeck() // this
        await serveCards()
        setClickedBatBtn(false)
    }

    const serveCards = async () => {
        // console.log('SSSSSSSSSSSSSSS')
        await sleep(2000)

        let playerState = gameState[`player${pNum}`]
        let c1, c2, c3
        if (playerState?.deck) [c1, c2, c3] = playerState?.deck.slice(0, 3)
        setDeck(playerState.deck)

        let ePlayer = gameState[`player${pNum === '1' ? 2 : 1}`]
        setScore(playerState.score)
        setEScore(ePlayer ? ePlayer.score : eScore)
        console.log(c1, c2, c3)

        fadeContext.fade.boolean = true
        fadeContext.fade.type = 'F'
        await sleep(1500)
        setCard1(c1)
        setECard3('joker')


        await sleep(1500)
        setCard2(c2)
        setECard2('joker')


        await sleep(1500)
        setCard3(c3)
        setECard1('joker')

    }

    const moveCardsToWinnerDeck = async () => {
        await sleep(2000)
        // console.log('WWWWWWWWWWWWWWWWWWWWW')
        let playerHand = gameState[`player${pNum}`].curr_play
        let ePlayerHand = gameState[`player${pNum === '1' ? 2 : 1}`].curr_play

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
        } else { // player2 wins battle
            console.log('heeeee', pNum, countOf2)
            if (pNum === '2') {
                console.log('heeOOO')
                winStack = setMyStack
            } else {
                console.log('heeEEE')
                winStack = setEStack
            }
        }

        fadeContext.fade.boolean = false
        await sleep(500)
        winStack(playerHand[0])
        aSetCard1('play_b_1')


        await sleep(500)
        winStack(ePlayerHand[0])
        aESetECard1('play_b_1')

        await sleep(500)
        winStack(playerHand[1])
        aSetCard2('play_b_2')


        await sleep(500)
        winStack(ePlayerHand[1])
        aESetECard2('play_b_2')


        await sleep(500)
        winStack(playerHand[2])
        aSetCard3('play_b_3')


        await sleep(500)
        winStack(ePlayerHand[2])
        aESetECard3('play_b_3')

        await sleep(500)
        winStack('card-back')
    }

    const moveCardsToBattle = async () => {

        let playerHand = gameState[`player${pNum}`].curr_play
        let ePlayerHand = gameState[`player${pNum === '1' ? 2 : 1}`].curr_play

        
        for (let card of [card1, card2, card3]) {
            
            let cIdx = playerHand.indexOf(card)
            
            await sleep(1000)
            // fadeContext.fade.boolean = true
            fadeContext.fade.type = 'B'
            if (card === card1) setCard1('play_b');
            if (card === card2) setCard2('play_b');
            if (card === card3) setCard3('play_b');

            await sleep(1000)
            // fadeContext.fade.boolean = true
            fadeContext.fade.type = 'F'
            if (cIdx === 0) aSetCard1(playerHand[cIdx]);
            if (cIdx === 1) aSetCard2(playerHand[cIdx]);
            if (cIdx === 2) aSetCard3(playerHand[cIdx]);
        }


        await sleep(1000)
        // fadeContext.fade.boolean = true
        fadeContext.fade.type = 'B'
        setECard1('play_b')
        setECard2('play_b')
        setECard3('play_b')

        await sleep(1000)

        // fadeContext.fade.boolean = true
        fadeContext.fade.type = 'F'
        aESetECard1('joker')
        aESetECard2('joker')
        aESetECard3('joker')

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
        // let moves = moves
        setClickedBatBtn(true)
        // setMoves(moves)

        socket.emit("games", { pNum: pNum, 'game_id': code, moves, compPlayer})
    }

    const setPosition = (e, mIdx, card) => {
        e.target.classList.add('red')
        setClickedBtns(clickedBtns.concat([e.target]))
        let dupMoves = moves.slice(0);

        dupMoves[mIdx] = card;

        setMoves(dupMoves)

        console.log(moves)
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
                />
                <div id='center-center'>
                    <div>
                        <Card backImg={'play_b_1'} imgName={aECard1 === '' ? 'play_b_1' : aECard1} />
                        <Card backImg={'play_b_2'} imgName={aECard2 === '' ? 'play_b_2' : aECard2} />
                        <Card backImg={'play_b_3'} imgName={aECard3 === '' ? 'play_b_3' : aECard3} />
                    </div>
                    <div>
                        {battle1 === '' && <span style={{opacity: '0'}}>nan</span>}
                        {battle1 === 'win' && <span style={{color: 'blue'}}>Win</span>}
                        {battle1 === 'lose' && <span style={{color: 'red'}}>Lose</span>}
                        {battle1 === 'tie' && <span style={{color: 'yellow'}}>Lose</span>}

                        {battle2 === '' && <span style={{opacity: '0'}}>nan</span>}
                        {battle2 === 'win' && <span style={{color: 'blue'}}>Win</span>}
                        {battle2 === 'lose' && <span style={{color: 'red'}}>Lose</span>}
                        {battle2 === 'tie' && <span style={{color: 'yellow'}}>Lose</span>}

                        {battle3 === '' && <span style={{opacity: '0'}}>nan</span>}
                        {battle3 === 'win' && <span style={{color: 'blue'}}>Win</span>}
                        {battle3 === 'lose' && <span style={{color: 'red'}}>Lose</span>}
                        {battle3 === 'tie' && <span style={{color: 'yellow'}}>Lose</span>}

                    </div>
                    <div>
                        <Card backImg={'play_b_1'} fade={card1Fade} imgName={aCard1 === '' ? 'play_b_1' : aCard1} />
                        <Card backImg={'play_b_2'} imgName={aCard2 === '' ? 'play_b_2' : aCard2} />
                        <Card backImg={'play_b_3'} imgName={aCard3 === '' ? 'play_b_3' : aCard3} />
                    </div>
                </div>
                <PlayerCardArea centerTB='center-bottom' 
                    eCard1={eCard1} eCard2={eCard2} eCard3={eCard3} 
                    card1={card1} card1Fade={card1Fade} card2={card2} card3={card3} 
                    isDisabled={isDisabled} 
                    setPosition={setPosition} 
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
            />
        </div>
    );
}

export default GameBoard;