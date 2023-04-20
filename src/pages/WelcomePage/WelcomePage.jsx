import React from 'react'
import { Link } from 'react-router-dom'

export default function WelcomePage() {
  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-center content-start bg-amber-700 mt-24 text-lg w-3/4 pl-8 pr-8'>
          <h1 className='text-8xl mt-4'>welcome to downbeat</h1><br/><br/>
          <div className='text-4xl'>
            <p>your go-to spot for jotting down spur of the moment musical ideas,
            freestyle back beats, and custom practice rhythms</p><br/><br/>
          </div>
          <div className='mb-4'>
          <Link to="/projects/new" className='text-4xl text-black'>create new project</Link>
          </div>
        </div>
      </div>
    </>
  )
}
