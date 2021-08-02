import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';
import SignUpForm from './auth/SignUpForm';
import GameBoard from './GameBoard';
import './NavBarModal.css';
import Splash from './Splash';
 
Storage = window.localStorage

// wallpaper credit: https://wall.alphacoders.com/big.php?i=619513

const NavBarModal = () => {

  
  // if (!) {
    //   Storage.setItem('visited', true)
    // }
    
    const user = useSelector(state => state.session.user)
    
    const [open, setOpen] = useState(true) // false
    const [splashOpen, setSplashOpen] = useState(false) // true
    const [code, setCode] = useState('')
    const [newCode, setNewCode] = useState('')
    const [playerNum, setPlayerNum] = useState(null)
    const [activeGame, setActiveGame] = useState(false)
    const [compPlayer, setCompPlayer] = useState(false)


    useEffect(() => {
      if (Storage.getItem('visited')) {
        setSplashOpen(true)
        setOpen(false)
      } else {
        Storage.setItem('visited', true)
      }
    }, [])

    
    // buttons of modal menu
  const [homeBtn, setHomeBtn] = useState(true)
  // const [loginBtn, setLoginBtn] = useState(true)
  // const [sighnUpBtn, setSignUpBtn] = useState(true)
  const [newGameBtn, setnewGameBtn] = useState(true)
  const [joinGameBtn, setJoinGameBtn] = useState(true)
  // const [loginForm, setLogInForm] = useState(false)
  // const [signUpForm, setSignUpForm] = useState(false)
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


  // copyFunc credit: w3Schools.com
  function copyFunc(e) {
    /* Get the text field */
    let copyText = e.target.parentNode.parentNode.children[0].children[0]

    console.log(copyText)

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }

  const startNewGameC = () => {
    // let compCode = code
    setOpen(true)
    setCode(code)
    setPlayerNum(1)
    setActiveGame(true)
    setCloseBtn(true)

    // setLoginBtn(false)
    // setSignUpBtn(false)
    setnewGameBtn(false)
    setJoinGameBtn(false)

    setCompPlayer(true)
    setCloseBtn(true)
    setInviteCode(true)
  }

  const startNewGameF = () => {
    setCode(code)
    setPlayerNum(1)
    setActiveGame(true)
    setCloseBtn(true)

    // setLoginBtn(false)
    // setSignUpBtn(false)
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

    // setLoginBtn(false)
    // setSignUpBtn(false)
    setnewGameBtn(false)
    setJoinGameBtn(false)
  }

  // const loginFunc = () => {
  //   // setLoginBtn(false)
  //   setSignUpBtn(false)
  //   setnewGameBtn(false)
  //   setJoinGameBtn(false)
  //   setLogInForm(true)
  // }

  // const signUpFunc = () => {
  //   setLoginBtn(false)
  //   setSignUpBtn(false)
  //   setnewGameBtn(false)
  //   setJoinGameBtn(false)
  //   // setLogInForm(true)
  //   setSignUpForm(true)
  // }

  const homeFunc = () => {
    setSplashOpen(false)
    setOpen(true)
    // setLoginBtn(true)
    // setSignUpBtn(true)
    // setnewGameBtn(true)
    // setJoinGameBtn(true)
    // setLogInForm(false)
    // setSignUpForm(false)
  }

  const modalIcon = (
    <button className='nav-button' 
      onClick={() => open ? setOpen(false) : setOpen(true)}
    ><i className="fas fa-bars"></i></button>
  )

  const splashIcon = (
    <button className='splash-button'
      onClick={() => splashOpen ? setSplashOpen(false) : setSplashOpen(true)}
    ><i className="far fa-question-circle"></i></button>
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
          {/* {loginBtn && !user && <li>
            <button 
             onClick={loginFunc}
            >
              Login
            </button>
          </li>} */}
          {/* {sighnUpBtn && !user && <li>
            <button 
              onClick={signUpFunc}
            >
              Sign Up
            </button>
          </li>} */}
          {!activeGame && newGameBtn && <li>
            <button
              onClick={startNewGameC}
            >
              New Game vs Computer
            </button>
          </li>}
          {!activeGame && newGameBtn && <li>
            <button
              onClick={startNewGameF}
            >
              New Game vs Friend
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
              placeholder='Invite Code'
            />
          </li>}
          {/* {loginForm && <li>
              <LoginForm/>
            </li>}
          {signUpForm && <li>
            <SignUpForm />
          </li>} */}
          {inviteCode &&
          <li id='invite-code'>
            <div>Invite Code:</div>
            <div id='invite-div'>
              <span className='invite-span'><input type={'text'} value={code} /></span>
              <span className='invite-span'><button
                      onClick={e => copyFunc(e)}
                    >Copy Code</button>
              </span>
            </div>
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
      {open ? modalIcon : modalMenu}
      {/* {!open ?  : null} */}

      {splashOpen ? splashIcon : <Splash splashOpen={splashOpen} setSplashOpen={setSplashOpen} open={open} setOpen={setOpen} activeGame={activeGame} />}
      {/* {!splashOpen ?  : null} */}

      < GameBoard code={code} pNum={`${playerNum}`} activeGame={activeGame} compPlayer={compPlayer}/>
    </>
  );
}

export default NavBarModal;
