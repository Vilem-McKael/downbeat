import React, { useEffect, useState } from 'react'
import Track from '../../components/Track/Track'
import { useParams, Navigate as navigate } from 'react-router-dom';
import * as projectsAPI from '../../utilities/projects-api';
import NavBar from '../../components/NavBar/NavBar';

export default function ProjectPage() {

  const [currentProject, setCurrentProject] = useState({});

  const [trackAdded, setTrackAdded] = useState(true);

  const [displayMessage, setDisplayMessage] = useState('this project does not exist');

  const [isPlaying, setIsPlaying] = useState(false);

  const { id } = useParams();

  

  useEffect(function () {
    async function getOne() {
      const projectId = {
        id: id
      }
      const project = await projectsAPI.getProjectById(projectId);
      console.log('retrieved project: ', project);
      if (project.length) {
        setCurrentProject(project[0]);
        setDisplayMessage(project[0].title);
      } else {
        setCurrentProject({});
      }
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
    setCurrentProject(projectWithNewTrack);
    console.log(projectWithNewTrack);
    
    // .then(setTracks[currentProject.tracks])
  }

function stopPlayback() {
    // stop();
    setIsPlaying(false);
    // setTrackIndex(0);
}

function startPlayback() {
    setIsPlaying(true);
}

async function handleSaveProject() {
  try {
    await projectsAPI.saveProject(currentProject)
    .then(console.log('Successfully saved project'));
  } catch (error) {
    console.log(error);
  }
}

async function handleDeleteProject() {
  try {
    const projectToDelete = {
      projectId: currentProject._id
    }
    const deletedTitle = currentProject.title;
    await projectsAPI.deleteProject(projectToDelete)
    setCurrentProject({});
    setDisplayMessage(`${deletedTitle} has been deleted`)
  } catch (error) {
    console.log(error);
  }
}

function updateTrackContents(trackIndex, contents) {
  const currentProjectCopy = JSON.parse(JSON.stringify(currentProject));
  console.log('pre-update track contents: ', currentProjectCopy.tracks[trackIndex].contents);
  currentProjectCopy.tracks[trackIndex].contents = contents;
  console.log('post-update track contents: ', currentProjectCopy.tracks[trackIndex].contents);
  console.log('currentProjectCopy: ', currentProjectCopy);
  setCurrentProject(currentProjectCopy);
}

  return (
    <div>
      <h1>{displayMessage}</h1>
      {Object.keys(currentProject).length ?
        <>
        
        <button onClick={stopPlayback}>Stop</button>
        <button onClick={startPlayback}>Start</button>
        <button onClick={handleSaveProject}>Save Project</button>
        <button onClick={handleDeleteProject}>Delete Project</button>
        {console.log(currentProject.tracks)}
        {currentProject.tracks.map((track, idx) => <Track track={track} key={idx} isPlaying={isPlaying} index={idx} updateTrackContents={updateTrackContents} />)}
        <button onClick={handleAddTrack}>New Track</button>
        </>
      :
        <>
        </>
      }
    </div>
  )
}

