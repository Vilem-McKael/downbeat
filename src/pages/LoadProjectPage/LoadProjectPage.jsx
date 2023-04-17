import React, { useEffect, useState } from 'react'
import * as projectsAPI from '../../utilities/projects-api'
import ProjectCard from '../../components/ProjectCard/ProjectCard';

export default function LoadProjectPage() {

  const [projects, setProjects] = useState([]);

  useEffect(function() {
    async function getProjects() {
      const loadedProjects = await projectsAPI.getAll();
      setProjects(loadedProjects);
      console.log(projects);
      console.log(loadedProjects);
    }
    getProjects();
  }, []);

  return (
    <>
      {projects.map((project, idx) => <ProjectCard project={project} key={idx}/>)}
    </>
  )
}
