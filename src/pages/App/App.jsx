// Libraries and methods
import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

// Style
import './App.css'

// Components
import ProjectPage from '../ProjectPage/ProjectPage'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar';
import LoadProjectPage from '../LoadProjectPage/LoadProjectPage';
import NewProjectPage from '../NewProjectPage/NewProjectPage';
import WelcomePage from '../WelcomePage/WelcomePage';


function App() {

  const [user, setUser] = useState(getUser());
  const [currentProject, setCurrentProject] = useState({});

  function updateUser(userState){
    setUser(userState);
  }

  function updateCurrentProject(projectDetails) {
    setCurrentProject(projectDetails);
  }

  return (
    <main className="App">
      { user ?
      <>
        <NavBar user={user} setUser={updateUser} currentProject={currentProject}/>
        <Routes>
          <Route path={`/project/:id`} currentProject={currentProject} element={<ProjectPage project={currentProject} />} />
          <Route path='/*' element={<WelcomePage />} />
          <Route path='/projects/new' element={<NewProjectPage currentProject={currentProject} updateCurrentProject={updateCurrentProject}/>} />
          <Route path='/projects/load' element={<LoadProjectPage />} />

        </Routes>
      </>
      :
      <AuthPage updateUser={updateUser} />
      }
      {/* <ProjectPage /> */}
    </main>
  )
}

export default App
