import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as projectsAPI from '../../utilities/projects-api';
import './ProjectCard.css'

export default function ProjectCard( {project, deleteById} ) {

  const date = new Date(project.createdAt);

  async function handleDelete() {
    if (confirm('you sure?')) {
      deleteById(project._id);
      const projectToDelete = {
        projectId: project._id
      }
      await projectsAPI.deleteProject(projectToDelete);
    }
  }

  return (
    <>
    
      <div className='flex justify-center'>
        <div className='flex items-center flex-col bg-[ivory] mt-16 p-8 text-lg w-3/5 rounded-2xl ring-8 ring-black shadow-lg shadow-black/60 ring-inset'>
          <div className='flex flex-col items-center text-center'>
            <div>
            <Link className='link' to={`/project/${project._id}`}>
            <h1 className='text-[5vmin] leading-[5.5vmin] break-words'>{project.title}</h1></Link><br/>
            <p className='tracking-widest'>created {date.toLocaleString('en-US', {})}</p><br/>
            <p className='mb-[4vmin] text-[3vmin]'>{project.tracks.length ? project.tracks.length : 'no'} {project.tracks.length === 1 ? 'track' : 'tracks'}</p>
            </div>
          </div>
          <button className='delete-button p-[1vmin] text-[2.5vmin]' onClick={handleDelete}>delete project</button>
        </div>
      </div>
    </>
    
  )
}
