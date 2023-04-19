import React from 'react'
import { Link } from 'react-router-dom'

export default function WelcomePage() {
  return (
    <>
    <div className='flex flex-col justify-center content-start bg-amber-700 mt-56 text-lg'>
      <h1 className='text-4xl mt-4'>welcome to downbeat</h1><br/>
      <p>your go-to spot for jotting down spur of the moment musical ideas,</p>
        <p>freestyle back beats, and custom practice rhythms</p><br/>
      <div className='mb-4'>
      <Link to="/projects/new">-create a new project</Link>
      </div>
    </div>
    </>
  )
}
