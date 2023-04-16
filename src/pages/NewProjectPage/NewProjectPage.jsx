import React from 'react'
import NewProjectForm from '../../components/NewProjectForm/NewProjectForm'

export default function NewProjectPage( { currentProject, updateCurrentProject } ) {
  return (
    <div>
        <NewProjectForm currentProject={currentProject} updateCurrentProject={updateCurrentProject} />
    </div>
  )
}
