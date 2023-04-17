import React from 'react'
import * as usersService from '../../utilities/users-service'
import { Link } from 'react-router-dom';

export default function NavBar( {user, updateUser} ) {

  function handleLogOut() {
    usersService.logOut()
    updateUser(null);
  }


  return (
    <nav>
      <Link to="/projects/new">New Project</Link>
      |
      <Link to="/projects/load">Load Project</Link>
      |
      <Link to='' onClick={handleLogOut}>Log Out</Link>
    </nav>
  )
}
