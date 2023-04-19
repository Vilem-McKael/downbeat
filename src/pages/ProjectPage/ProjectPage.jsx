// sample imports

import kick1 from '../../assets/sounds/kicks/kick1.wav';
import kick2 from '../../assets/sounds/kicks/kick2.wav';
import kick3 from '../../assets/sounds/kicks/kick3.wav';
import snare1 from '../../assets/sounds/snares/snare1.wav';
import snare2 from '../../assets/sounds/snares/snare2.wav';
import snare3 from '../../assets/sounds/snares/snare3.wav';
import hihat1 from '../../assets/sounds/hats/hihat1.wav';
import hihat2 from '../../assets/sounds/hats/hihat2.wav';
import hihat3 from '../../assets/sounds/hats/hihat3.wav';
import clap1 from '../../assets/sounds/claps/clap1.wav';
import clap2 from '../../assets/sounds/claps/clap2.wav';
import clap3 from '../../assets/sounds/claps/clap3.wav';
import openhat1 from '../../assets/sounds/openhats/openhat1.wav';
import openhat2 from '../../assets/sounds/openhats/openhat2.wav';
import tom1 from '../../assets/sounds/toms/tom1.wav';
import tom2 from '../../assets/sounds/toms/tom2.wav';

const sampleObj = {
  'kicks': {
    'kick1': kick1,
    'kick2': kick2,
    'kick3': kick3,
  },
  'snares': {
    'snare1': snare1,
    'snare2': snare2,
    'snare3': snare3,
  },
  'hihats': {
    'hihat1': hihat1,
    'hihat2': hihat2,
    'hihat3': hihat3
  },
  'claps': {
    'clap1': clap1,
    'clap2': clap2,
    'clap3': clap3
  },
    'openhats': {
    'openhat1': openhat1,
    'openhat2': openhat2
  },
    'toms': {
    'tom1': tom1,
    'tom2': tom2
  }
}

// React imports

import React, { useEffect, useState } from 'react'
import Track from '../../components/Track/Track'
import { useParams, Navigate as navigate } from 'react-router-dom';
import * as projectsAPI from '../../utilities/projects-api';
import NavBar from '../../components/NavBar/NavBar';

export default function ProjectPage() {

  const [currentProject, setCurrentProject] = useState({});

  // const [trackAdded, setTrackAdded] = useState(true);

  const [displayMessage, setDisplayMessage] = useState('loading...');

  const [isPlaying, setIsPlaying] = useState(false);

  const [stateBpm, setStateBpm] = useState(120);

  const [displayBpm, setDisplayBpm] = useState(120);

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
        setStateBpm(project[0].bpm);
        setDisplayBpm(project[0].bpm);
      } else {
        setCurrentProject({});
        setDisplayMessage('this project does not exist')
      }
    }
    getOne();
  }, [])

  async function handleAddTrack() {
    stopPlayback();
    const trackDetails = {
      title: 'kick1',
      contents: [0, 0, 0, 0, 0, 0, 0, 0],
      // sample: '',
    }
    const projectWithNewTrack = await projectsAPI.addTrack(id, trackDetails)
    setCurrentProject(projectWithNewTrack);
    // console.log(projectWithNewTrack);
    // .then(setTracks[currentProject.tracks])
  }

function stopPlayback() {
    // stop();
    setIsPlaying(false);
    // setTrackIndex(0);
}

function startPlayback() {
    setTimeout(() => setIsPlaying(true), 1000)
}

async function handleSaveProject() {
  stopPlayback();
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

async function handleDeleteTrack(tid) {
  stopPlayback();
  try {
    const trackToDelete = {
      trackId: tid
    }
    console.log(trackToDelete, currentProject._id);
    await projectsAPI.deleteTrack(currentProject._id, trackToDelete);
    const currentProjectCopy = JSON.parse(JSON.stringify(currentProject));
    currentProjectCopy.tracks = currentProject.tracks.filter((track) => tid !== track._id);
    setCurrentProject(currentProjectCopy);
  } catch (error) {
    console.log(error);
  }
}

function updateTrackContents(trackIndex, contents) {
  const currentProjectCopy = JSON.parse(JSON.stringify(currentProject));
  // console.log('pre-update track contents: ', currentProjectCopy.tracks[trackIndex].contents);
  currentProjectCopy.tracks[trackIndex].contents = contents;
  // console.log('post-update track contents: ', currentProjectCopy.tracks[trackIndex].contents);
  // console.log('currentProjectCopy: ', currentProjectCopy);
  setCurrentProject(currentProjectCopy);
}

function handleChangeBPM(evt) {
  setDisplayBpm(evt.target.value);
}

function handleSetBpm() {
  stopPlayback();
  setDisplayBpm(parseInt(displayBpm));
  const currentProjectCopy = JSON.parse(JSON.stringify(currentProject));
  currentProjectCopy.bpm = parseInt(displayBpm);
  setStateBpm(displayBpm);
  setCurrentProject(currentProjectCopy);
  // setCurrentProject({...currentProject, bpm: displayBpm}); // ({...currentProject, bpm})
  console.log('project post BPM set: ', currentProject, ' displayBpm: ', displayBpm);
}

function getSample(category, title) {
  return sampleObj[category][title];
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
        <label>BPM: </label>
        <input type='number' onChange={handleChangeBPM} value={displayBpm} />
        <button onClick={handleSetBpm}>Update</button>
        {currentProject.tracks.map((track, idx) =>
          <Track 
            track={track}
            key={idx} 
            bpm={stateBpm}
            isPlaying={isPlaying} 
            index={idx} 
            updateTrackContents={updateTrackContents} 
            deleteTrack={handleDeleteTrack}
            getSample={getSample}
          />)}
        <button onClick={handleAddTrack}>New Track</button>
        </>
      :
        <>
        </>
      }
    </div>
  )
}

