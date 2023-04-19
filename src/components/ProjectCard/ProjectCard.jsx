import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as projectsAPI from '../../utilities/projects-api';

export default function ProjectCard( {project, deleteById} ) {

  const [reRender, setReRender] = useState(true)

  const date = new Date(project.createdAt);
  const navigate = useNavigate();

  async function handleDelete() {
    deleteById(project._id);
    const projectToDelete = {
      projectId: project._id
    }
    await projectsAPI.deleteProject(projectToDelete);
  }

  return (
    <>
      <Link to={`/project/${project._id}`}>
        <div>
        <h1>{project.title}</h1>
        <p>{date.toLocaleDateString('en-US')}</p>
        </div>
      </Link>
      <button onClick={handleDelete}>X</button>
    </>
  )
}
