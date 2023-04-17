import React, { useEffect, useState } from 'react'
import Track from '../../components/Track/Track'
import { useParams } from 'react-router-dom';
import * as projectsAPI from '../../utilities/projects-api';

export default function ProjectPage() {

  const [currentProject, setCurrentProject] = useState({});

  const [tracks, setTracks] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);

  const { id } = useParams();

  useEffect(function () {
    async function getOne() {
      const projectId = {
        id: id
      }
      const project = await projectsAPI.getProjectById(projectId);
      console.log('retrieved project: ', project);
      setCurrentProject(project[0]);
    }
    getOne();
  }, [])

  async function handleAddTrack() {
    const trackDetails = {
      title: 'kick1',
      contents: [0, 0, 0, 0, 0, 0, 0, 0],
      // sample: '',
    }
    const projectWithNewTrack = await projectsAPI.addTrack(id, trackDetails)
    .then(setCurrentProject[projectWithNewTrack])
    .then(console.log(projectWithNewTrack));
    // .then(setTracks[currentProject.tracks])
  }

  function stopPlayback() {
    // stop();
    setIsPlaying(false);
    setTrackIndex(0);
}

function startPlayback() {
    setIsPlaying(true);
}

  console.log(currentProject);

  return (
    <div>
      <h1>{currentProject.title}</h1>
      {currentProject.title ?
        <>
        <button onClick={stopPlayback}>Stop</button>
        <button onClick={startPlayback}>Start</button>
        {console.log(currentProject.tracks)}
        {currentProject.tracks.map((track, idx) => <Track track={track} key={idx} isPlaying={isPlaying} index={idx} />)}
        </>
      :
        <>
        </>
      }
      <button onClick={handleAddTrack}>New Track</button>
    </div>
  )
}

