import React from 'react'
import { Link } from 'react-router-dom'
import './WelcomePage.css'

export default function WelcomePage() {
  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-center items-center bg-amber-700 mt-24 text-lg w-4/5 pl-8 pr-8 rounded-xl'>
          <img className='w-72 m-auto' src='https://i.imgur.com/5jtUS3f.png' />
          {/* <h1 className='text-4xl mt-4'>welcome to downbeat</h1><br/><br/> */}
          <div className='welcome-text w-90'>
            <p>a compact DAW for musical ideas,
            freestyle beats, and custom backing tracks</p><br/><br/>
          </div>
          <div className='mb-4'>
          <Link to="/projects/new" className='text-2xl text-black underline'>create a new project</Link>
          </div>
        </div>
      </div>
    </>
  )
}
