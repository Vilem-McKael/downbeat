import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Project from './pages/Project/Project'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Project />
    </div>
  )
}

export default App
