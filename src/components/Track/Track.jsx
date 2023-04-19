import React, { useEffect, useState } from 'react'
import kick1 from '../../../src/assets/sounds/kicks/kick1.wav'
// import * as soundData from '../../../soundData'
import useSound from 'use-sound';
import Tile from '../Tile/Tile';
import './Track.css'
import TrackHeader from '../TrackHeader/TrackHeader';

export default function Track({track, bpm, index, isPlaying, updateTrackContents, deleteTrack, getSample}) {

    const [trackInputs, setTrackInputs] = useState(track.contents);
    const [sample, setSample] = useState(null);
    const [playSound, {stop}] = useSound(sample, {volume: .25, interrupt: true});
    const [trackIndex, setTrackIndex] = useState(0);

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
                console.log(trackIndex);
                console.log('bpm: ', bpm);
            }, Math.floor(60000 / bpm));
        } else {
            clearInterval(playback);
            setTrackIndex(0);
        }

        return () => clearInterval(playback);
    }, [isPlaying, trackInputs, trackIndex]);

    function updateBinaryTrackInput(idx) {
        const updatedInputs = trackInputs;
        console.log('before: ', updatedInputs)
        updatedInputs[idx] = (updatedInputs[idx] + 1) % 2;
        console.log('after: ', updatedInputs)
        setTrackInputs(updatedInputs);
        updateTrackContents(index, trackInputs);
        console.log('state: ', trackInputs);
    }

    function updateSample (sampleName) {
        const newSample = getSample(sampleName);
        setSample(newSample);
    }

    return (
        <div>
            <div>
                {/* <button onClick={playSound}>Kick</button> */}
            </div>
            <div className='track'>
                <TrackHeader track={track} deleteTrack={deleteTrack} updateSample={updateSample}/>
                {trackInputs.map((value, idx) => <Tile key={idx} index={idx} value={value} trackIndex={(trackIndex + 7) % 8} updateBinaryTrackInput={updateBinaryTrackInput}/>)}
            </div>
        </div>
    )
}