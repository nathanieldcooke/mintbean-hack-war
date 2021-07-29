import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {

  const [code, setCode] = useState('')

  const [newCode, setNewCode] = useState('')
  // console.log(newCode)jjiji

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

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to={`/new-game/${code}/1`} exact={true} activeClassName="active">
            NewGame
          </NavLink>
        </li>
        <li>
          <NavLink to={`/new-game/${newCode}/2`} exact={true} activeClassName="active">
            JoinGame
          </NavLink>
          <input
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
          />
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
