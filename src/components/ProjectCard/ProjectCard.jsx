import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as projectsAPI from '../../utilities/projects-api';
import './ProjectCard.css'

export default function ProjectCard( {project, deleteById} ) {

  const date = new Date(project.createdAt);

  async function handleDelete() {
    deleteById(project._id);
    const projectToDelete = {
      projectId: project._id
    }
    await projectsAPI.deleteProject(projectToDelete);
  }

  return (
    <>
    <div className='flex justify-center'>
    <div className='flex-col bg-amber-700 mt-16 p-8 text-lg w-3/5 rounded-2xl'>
        <Link to={`/project/${project._id}`}>
          <div>
          <h1 className='text-4xl'>{project.title}</h1><br/>
          <p>{date.toLocaleString('en-US')}</p><br/>
          </div>
        </Link>
        <button className='delete-button' onClick={handleDelete}>delete project</button>
      </div>
      </div>
    </>
    
  )
}
