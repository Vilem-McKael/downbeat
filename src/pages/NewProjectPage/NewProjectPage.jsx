import React from 'react'
import NewProjectForm from '../../components/NewProjectForm/NewProjectForm'

export default function NewProjectPage( {} ) {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col justify-center content-start bg-amber-700 mt-24 text-lg w-3/4 pl-8 pr-8 pt-8 rounded-xl'>
          <h1 className='text-4xl'>new project</h1><br/><br/>
          <NewProjectForm />
      </div>
    </div>
  )
}
