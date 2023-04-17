import React, { useEffect, useState } from 'react'
import Track from '../../components/Track/Track'
import { useParams } from 'react-router-dom';
import * as projectsAPI from '../../utilities/projects-api';

export default function ProjectPage() {

  const [currentProject, setCurrentProject] = useState({});

  const { id } = useParams();

  useEffect(function () {
    async function getOne() {
      const projectId = {
        id: id
      }
      const project = await projectsAPI.getProjectById(projectId);
      setCurrentProject(project);
    }
    getOne();
  }, [])

  return (
    <div>
      <h1>Project</h1>
      <Track />
    </div>
  )
}

