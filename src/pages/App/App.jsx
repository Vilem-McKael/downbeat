import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Project from '../Project/Project'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Routes, Route } from 'react-router-dom';
import { getUser } from './';


function App() {
  const [user, setUser] = useState(getUser());

  function updateUser(userState){
    setUser(userState);
  }

  return (
    <main className="App">
      {user ?
      <>
        <NavBar user={user} setUser={updateUser}/>
        <Routes>
          <Route path='/project/:id' element={<Project />} />
          <Route path='/projects/load' element={<LoadProjectPage />} />
          <Route path='/projects/new' element={<NewProjectPage />} />
        </Routes>
      </>
      :
      <AuthPage setUser={updateUser} />
      }
    </main>
  )
}

export default App
