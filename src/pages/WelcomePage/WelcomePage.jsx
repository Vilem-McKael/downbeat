import React from 'react'
import { Link } from 'react-router-dom'

export default function WelcomePage() {
  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-center content-start bg-amber-700 mt-24 text-lg w-4/5 pl-8 pr-8 rounded-xl'>
          <img className='w-72 m-auto' src='https://i.imgur.com/5jtUS3f.png' />
          {/* <h1 className='text-4xl mt-4'>welcome to downbeat</h1><br/><br/> */}
          <div className='text-2xl'>
            <p>your go-to spot for jotting down spur of the moment musical ideas,
            freestyle back beats, and custom practice rhythms</p><br/><br/>
          </div>
          <div className='mb-4'>
          <Link to="/projects/new" className='text-2xl text-black underline'>create a new project</Link>
          </div>
        </div>
      </div>
    </>
  )
}
