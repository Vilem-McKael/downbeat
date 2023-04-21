import React, { useEffect, useState } from 'react'
import kick1 from '../../../src/assets/sounds/kicks/kick1.wav'
// import * as soundData from '../../../soundData'
import useSound from 'use-sound';
import Tile from '../Tile/Tile';
import './Track.css'
import TrackHeader from '../TrackHeader/TrackHeader';

export default function Track({track, index, bpm, isPlaying, passedSample, sampleName, updateTrackContents, deleteTrack, updateSample}) {

    const [trackInputs, setTrackInputs] = useState(track.contents);
    
    const [trackIndex, setTrackIndex] = useState(0);

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
                    // stop();
                }
            }, Math.floor(59000 / bpm));
        } else {
            clearInterval(playback);
            setTrackIndex(0);
        }

        return () => clearInterval(playback);
    }, [isPlaying, trackInputs, trackIndex]);

    function updateBinaryTrackInput(idx) {
        const updatedInputs = trackInputs;
        updatedInputs[idx] = (updatedInputs[idx] + 1) % 2;
        setTrackInputs(updatedInputs);
        updateTrackContents(index, trackInputs);
    }

    async function changeSample (category, name) {
        await updateSample(category, name, track._id);
        stop();
    }

    return (
        <div className='track'>
            <TrackHeader track={track} sampleName={sampleName} deleteTrack={deleteTrack} changeSample={changeSample}/>
            {trackInputs.map((value, idx) => <Tile key={idx} index={idx} value={value} trackIndex={(trackIndex + 7) % 8} updateBinaryTrackInput={updateBinaryTrackInput}/>)}
        </div>
    )
}