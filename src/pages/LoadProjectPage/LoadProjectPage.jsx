import React, { useEffect, useState } from 'react'
import * as projectsAPI from '../../utilities/projects-api'
import ProjectCard from '../../components/ProjectCard/ProjectCard';

export default function LoadProjectPage() {

  const [projects, setProjects] = useState([]);

  async function deleteById (deletedProjectId) {
    setProjects(projects.filter(project => project._id !== deletedProjectId));
  }

  useEffect(function() {
    async function getProjects() {
      const loadedProjects = await projectsAPI.getAll();
      setProjects(loadedProjects);
    }
    getProjects();
  }, []);

  return (
    <>
      {projects.map((project, idx) => <ProjectCard project={project} deleteById={deleteById} key={idx}/>)}
    </>
  )
}
