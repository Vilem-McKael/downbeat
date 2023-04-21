// ---------- SAMPLE IMPORTS ----------

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

// ---------- SAMPLE OBJECT ----------

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

// ---------- REACT IMPORTS ----------

import React, { useEffect, useState } from 'react'
import Track from '../../components/Track/Track'
import { useParams} from 'react-router-dom';
import * as projectsAPI from '../../utilities/projects-api';
import './ProjectPage.css'


// ---------- PROJECT PAGE ---------- 

export default function ProjectPage() {

  // ---------- PARAMS ----------

  const { id } = useParams(); 

  // ---------- STATE VARIABLES ----------

  // Stores the current project
  const [currentProject, setCurrentProject] = useState({});

  // Stores the content displayed in the h1 at the top of ProjectPage
  const [displayMessage, setDisplayMessage] = useState('loading...');

  // Bool that determines whether or not the project is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Holds the bpm at which the track is currently playing
  const [stateBpm, setStateBpm] = useState(120);

  // Holds the bpm that is displayed in the input
  // Equal to stateBpm unless user has modified and it
  // and not pressed 'update'
  const [displayBpm, setDisplayBpm] = useState(120);

  // we'll see
  const [trackSamples, setTrackSamples] = useState([]);

  //
  const [sampleNames, setSampleNames] = useState([]);

  // state to control the rerendering of tracks upon state changes
  const [renderTracks, setRenderTracks] = useState(false);

  // state to control the updating of tracks
  const [updateTracks, setUpdateTracks] = useState(false);

   

  useEffect(function () {
    async function renderProject() {
      const projectId = {
        id: id
      }
      const project = await projectsAPI.getProjectById(projectId);
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
    renderProject();
  }, [])

  useEffect(function () {
    async function getAllTrackSamples() {
        if (Object.keys(currentProject).length) {
          setRenderTracks(false);
          const currentProjectCopy = JSON.parse(JSON.stringify(currentProject));
          const tracks = [...currentProjectCopy.tracks];
          const retrievedSamples = [];
          const retrievedNames = [];
          for (let i = 0; i < tracks.length; i++) {
            const [sampleCategory, sampleName] = tracks[i].sample.split('_');
            const thisSample = sampleObj[sampleCategory][sampleName];
            retrievedSamples.push(thisSample)
            retrievedNames.push(sampleName);
          }
          setTrackSamples(retrievedSamples);
          setSampleNames(retrievedNames);
          setRenderTracks(true);
      }
    }
    getAllTrackSamples();
  }, [currentProject]);

  async function handleAddTrack() {
    stopPlayback();
    await handleSaveProject();
    setRenderTracks(false);
    const trackDetails = {
      sample: 'snares_snare1',
      contents: [0, 0, 0, 0, 0, 0, 0, 0],
    }
    const projectWithNewTrack = await projectsAPI.addTrack(id, trackDetails)
    setCurrentProject(projectWithNewTrack);
  }

function stopPlayback() {
    setIsPlaying(false);
}

function startPlayback() {
    setUpdateTracks(!updateTracks);
    setTimeout(() => setIsPlaying(true), 1000)
}

async function handleSaveProject() {
  stopPlayback();
  try {
    await projectsAPI.saveProject(currentProject)
  } catch (error) {
    console.log(error);
  }
}

async function handleDeleteProject() {
  if (confirm('you sure you wanna delete this fire beat?')) {
    try {
      stopPlayback();
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
}

async function handleDeleteTrack(tid) {
  stopPlayback();
  try {
    stopPlayback();
    setRenderTracks(false);
    setDisplayMessage('loading...')
    const trackToDelete = {
      trackId: tid
    }
    await projectsAPI.deleteTrack(currentProject._id, trackToDelete);
    const currentProjectCopy = JSON.parse(JSON.stringify(currentProject));
    currentProjectCopy.tracks = currentProjectCopy.tracks.filter((track) => tid.toString() !== track._id.toString());
    setCurrentProject(currentProjectCopy);
    setDisplayMessage(currentProjectCopy.title);
  } catch (error) {
    console.log(error);
  }
}

function updateTrackContents(trackIndex, contents) {
  const currentProjectCopy = JSON.parse(JSON.stringify(currentProject));
  currentProjectCopy.tracks[trackIndex].contents = contents;
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
}

function updateSample(category, title, trackId) {
  setRenderTracks(false);
  const currentProjectCopy = JSON.parse(JSON.stringify(currentProject));
  const currentTracks = currentProjectCopy.tracks;
  // https://stackoverflow.com/questions/7176908/how-can-i-get-the-index-of-an-object-by-its-property-in-javascript
  const thisIndex = currentTracks.map(function(track) {return track._id}).indexOf(trackId);
  currentTracks[thisIndex].sample = (`${category}_${title}`);
  currentProjectCopy.tracks = currentTracks;
  setCurrentProject(currentProjectCopy);
  setRenderTracks(true);
  setUpdateTracks(!updateTracks);
  return sampleObj[category][title];
}

  return (
    <div>
      <div className='flex items-center justify-center'>
        <h1 className='text-[ivory] bg-black pl-4 pr-4 rounded-[1vmin] text-[5vmin] mb-[2vmin] ml-[12vmin] mr-[12vmin] text-center'>{displayMessage}</h1>
      </div>
      {Object.keys(currentProject).length ?
        <>
          <div className='controlContainer flex flex-row contents-center justify-evenly mb-4 mt-2'>
            <div>
              <button className='bg-lime-900 pl-4 pr-4 mr-2' onClick={startPlayback}>start</button>
              <button className='bg-red-900 pl-4 pr-4 mr-2' onClick={stopPlayback}>stop</button>
              <button className='bg-amber-700 pl-4 pr-4 mr-2' onClick={handleSaveProject}>save</button>
              <button className='bg-black pl-4 pr-4 mr-2'onClick={handleDeleteProject}>delete project</button>
            </div>
            <div>
              <label className='text-black rounded-lg text-lg font-black'>bpm:&nbsp;</label>
              <input className='w-12 mr-2 bg-black text-[ivory] rounded-lg' type='number' onChange={handleChangeBPM} value={displayBpm} />
              <button className='bg-[ivory] text-black pl-4 pr-4' onClick={handleSetBpm}>update bpm</button>
            </div>
          </div>
          { renderTracks && currentProject.tracks.length ?
          <div className='track-container'>
            <div className='wood-background ring-8 ring-amber-950 shadow-xl shadow-black rounded-[1vmin]'>
              
                <>
                  {currentProject.tracks.map((track, idx) =>
                    <Track 
                      key={idx} 
                      track={track}
                      index={idx} 
                      bpm={stateBpm}
                      isPlaying={isPlaying} 
                      passedSample={trackSamples[idx]}
                      sampleName={sampleNames[idx]}
                      updateTrackContents={updateTrackContents} 
                      deleteTrack={handleDeleteTrack}
                      updateSample={updateSample}
                  />)}
                </>
                </div>
          </div>
          :
          <>
          </>
          }
         
          <div className='flex items-center justify-center'>
            <button className='bg-amber-700 pl-4 pr-4 mt-6 mb-4' onClick={handleAddTrack}>new track (save)</button>
          </div>
        </>
      :
        <>
        </>
      }
    </div>
  )
}

