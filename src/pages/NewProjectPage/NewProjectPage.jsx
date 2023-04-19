import React from 'react'
import NewProjectForm from '../../components/NewProjectForm/NewProjectForm'

export default function NewProjectPage( {} ) {
  return (
    <div className='flex flex-col justify-center content-start bg-amber-700 mt-56 text-lg'>
        <h1 className='text-4xl'>new project</h1><br/>
        <NewProjectForm />
    </div>
  )
}
