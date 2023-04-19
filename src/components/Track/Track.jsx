import React, { useEffect, useState } from 'react'
import kick1 from '../../../src/assets/sounds/kicks/kick1.wav'
// import * as soundData from '../../../soundData'
import useSound from 'use-sound';
import Tile from '../Tile/Tile';
import './Track.css'
import TrackHeader from '../TrackHeader/TrackHeader';

export default function Track({track, bpm, isPlaying, passedSample, sampleName, index, samplePassed, updateTrackContents, deleteTrack, updateSample, updateTracks}) {

    const [trackInputs, setTrackInputs] = useState(track.contents);
    
    const [trackIndex, setTrackIndex] = useState(0);

    const [showTrack, setShowTrack] = useState(true);
    const [sample, setSample] = useState(passedSample);
    const [playSound, {stop}] = useSound(passedSample, {volume: .25, interrupt: true});

    useEffect(function() {
        // https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
        let playback = null;
        if (isPlaying) {
            playback = setInterval(() => {
                setTrackIndex((trackIndex + 1) % 8);
                if (isPlaying && trackInputs[trackIndex]) {
                    playSound();
                } else {
                    stop();
                }
                // setTrackIndex((trackIndex + 1) % 8);
                // console.log(trackIndex);
                // console.log('bpm: ', bpm);
            }, Math.floor(60000 / bpm));
        } else {
            clearInterval(playback);
            setTrackIndex(0);
        }

        return () => clearInterval(playback);
    }, [isPlaying, trackInputs, trackIndex, sample]);

    function updateBinaryTrackInput(idx) {
        const updatedInputs = trackInputs;
        // console.log('before: ', updatedInputs)
        updatedInputs[idx] = (updatedInputs[idx] + 1) % 2;
        // console.log('after: ', updatedInputs)
        setTrackInputs(updatedInputs);
        updateTrackContents(index, trackInputs);
        // console.log('state: ', trackInputs);
    }

    async function changeSample (category, name) {
        await updateSample(category, name, track._id);
        stop();
    }

    return (
        <div>
            <div>
                {/* <button onClick={playSound}>Kick</button> */}
            </div>
            <div className='track'>
                {showTrack ? 
                <>
                    <TrackHeader track={track} sampleName={sampleName} deleteTrack={deleteTrack} changeSample={changeSample}/>
                    {trackInputs.map((value, idx) => <Tile key={idx} index={idx} value={value} trackIndex={(trackIndex + 7) % 8} updateBinaryTrackInput={updateBinaryTrackInput}/>)}
                </>
                :
                <>
                </>
                }
                
            </div>
        </div>
    )
}