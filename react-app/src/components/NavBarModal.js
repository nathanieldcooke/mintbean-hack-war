import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';
import SignUpForm from './auth/SignUpForm';
import GameBoard from './GameBoard';
import './NavBarModal.css';

const NavBarModal = () => {

  const user = useSelector(state => state.session.user)

  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [newCode, setNewCode] = useState('')
  const [playerNum, setPlayerNum] = useState(null)
  const [activeGame, setActiveGame] = useState(false)

  // buttons of modal menu
  const [homeBtn, setHomeBtn] = useState(true)
  const [loginBtn, setLoginBtn] = useState(true)
  const [sighnUpBtn, setSignUpBtn] = useState(true)
  const [newGameBtn, setnewGameBtn] = useState(true)
  const [joinGameBtn, setJoinGameBtn] = useState(true)
  const [loginForm, setLogInForm] = useState(false)
  const [signUpForm, setSignUpForm] = useState(false)
  const [closeBtn, setCloseBtn] = useState(false)
  const [inviteCode, setInviteCode] = useState(false)


  useEffect(() => {
    const fetchCode = async () => {
      let res = await fetch('/api/game', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // await res.json()
      // console.log(code)
      let data = await res.json()
      // console.log(code)
      setCode(data['code'])
    }
    fetchCode()
  }, [])
  // fetchCode()

  console.log(code)
  // console.log(newCode)

  const startNewGame = () => {
    setCode(code)
    setPlayerNum(1)
    setActiveGame(true)
    setCloseBtn(true)

    setLoginBtn(false)
    setSignUpBtn(false)
    setnewGameBtn(false)
    setJoinGameBtn(false)

    
    setCloseBtn(true)
    setInviteCode(true)
  }

  const joinNewGame = () => {
    setCode(newCode)
    setPlayerNum(2)
    setActiveGame(true)
    setCloseBtn(true)
  }

  const loginFunc = () => {
    setLoginBtn(false)
    setSignUpBtn(false)
    setnewGameBtn(false)
    setJoinGameBtn(false)
    setLogInForm(true)
  }

  const signUpFunc = () => {
    setLoginBtn(false)
    setSignUpBtn(false)
    setnewGameBtn(false)
    setJoinGameBtn(false)
    // setLogInForm(true)
    setSignUpForm(true)
  }

  const homeFunc = () => {
    setLoginBtn(true)
    setSignUpBtn(true)
    setnewGameBtn(true)
    setJoinGameBtn(true)
    setLogInForm(false)
    setSignUpForm(false)
  }

  const modalIcon = (
    <button className='nav-button' 
      onClick={() => open ? setOpen(false) : setOpen(true)}
    ><i className="fas fa-bars"></i></button>
  )

  const modalMenu = (
    <>
      <div className='nav-container'>
    </div>
      <nav>
        <ul>
          {homeBtn && <li>
            <button 
              onClick={homeFunc}
            >
              Home
            </button>
          </li>}
          {user && <li id='logout-btn'>
            <LogoutButton />
          </li>}
          {loginBtn && !user && <li>
            <button 
             onClick={loginFunc}
            >
              Login
            </button>
          </li>}
          {sighnUpBtn && !user && <li>
            <button 
              onClick={signUpFunc}
            >
              Sign Up
            </button>
          </li>}
          {!activeGame && newGameBtn && <li>
            <button
              onClick={startNewGame}
            >
              New Game
            </button>
          </li>}
          { !activeGame && joinGameBtn && <li className='join-game'>
            <button 
              onClick={joinNewGame}
            >
              Join Game
            </button>
            <input
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
            />
          </li>}
          {loginForm && <li>
              <LoginForm/>
            </li>}
          {signUpForm && <li>
            <SignUpForm />
          </li>}
          {inviteCode &&
          <li>
              <div>Invite Code</div>
              <di>{code}</di>
          </li>
          }
          { closeBtn && <li>
              <button
                onClick={() => open ? setOpen(false) : setOpen(true)}
              >close</button>
          </li>}

        </ul>
      </nav>
    </>
  )

  return (
    <>
      {open ? modalIcon : null}
      {!open ? modalMenu : null}
      < GameBoard code={code} pNum={`${playerNum}`} activeGame={activeGame}/>
    </>
  );
}

export default NavBarModal;
