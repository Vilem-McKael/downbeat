import React from 'react'
import { Link } from 'react-router-dom';
import * as projectsAPI from '../../utilities/projects-api';

export default function ProjectCard( {project} ) {

  const date = new Date(project.createdAt);

  function handleDelete() {

  }

  return (
    <Link to={`/project/${project._id}`}>
      <div>
      <h1>{project.title}</h1>
      <p>{date.toLocaleDateString('en-US')}</p>
      <small onClick={handleDelete}>X</small>
      </div>
    </Link>
  )
}
