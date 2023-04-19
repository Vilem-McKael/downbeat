import React from 'react'
import * as usersService from '../../utilities/users-service'
import { Link } from 'react-router-dom';

export default function NavBar( {user, updateUser} ) {

  function handleLogOut() {
    usersService.logOut()
    updateUser(null);
  }


  return (
    <nav className='flex bg-amber-700 text-xl justify-evenly m-4 mt-0 h-10 pt-1'>
      <Link to="/projects/new">New Project</Link>
      |
      <Link to="/projects/load">Load Project</Link>
      |
      <Link to='' onClick={handleLogOut}>Log Out</Link>
    </nav>
  )
}
