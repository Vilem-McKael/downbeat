import React from 'react'
import NewProjectForm from '../../components/NewProjectForm/NewProjectForm'

export default function NewProjectPage( {} ) {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col justify-center content-start bg-[ivory] mt-24 text-lg w-3/5 pl-8 pr-8 pt-8 rounded-xl ring-8 ring-black shadow-lg shadow-[ivory] ring-inset'>
          <div className='flex justify-center'>
          <h1 className='text-4xl'>new project</h1>
          </div><br/><br/>
          <NewProjectForm />
      </div>
    </div>
  )
}
