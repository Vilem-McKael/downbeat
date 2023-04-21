import React from 'react'
import { Link } from 'react-router-dom'
import './WelcomePage.css'

export default function WelcomePage() {
  return (
    <>
      <div className='flex flex-col justify-center'>
          <img className='w-[80vmin] m-auto mb-14 mt-8' src='https://i.imgur.com/IYJdzkF.png' />
          {/* <h1 className='text-4xl mt-4'>welcome to downbeat</h1><br/><br/> */}
          <div className='flex flex-col items-center justify-center welcome-text bg-black text-[ivory]'>
            <p className='w-[60vmin]'>a compact DAW for musical ideas,
            freestyle beats, and custom backing tracks</p><br/><br/>
            <Link to="/projects/new" className='start-button text-black bg-[ivory] text-center rounded-[2vmin] p-4 wi'>let's rock</Link>
          </div>
        </div>
    </>
  )
}
