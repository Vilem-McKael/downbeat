import React from 'react'
import * as usersService from '../../utilities/users-service'
import { Link } from 'react-router-dom';
import './NavBar.css'

export default function NavBar( {user, updateUser} ) {

  function handleLogOut() {
    usersService.logOut()
    updateUser(null);
  }


  return (
    <nav className='navbar flex bg-amber-700 items-center justify-evenly text-xl h-[10vh] pt-1'>
        <Link to='/'><img className='w-24' src='https://i.imgur.com/5jtUS3f.png' /></Link>
        |
        <Link to="/projects/new">create new</Link>
        |
        <Link to="/projects/load">load saved</Link>
        |
        <Link to='' onClick={handleLogOut}>log out</Link>
    </nav>
  )
}
