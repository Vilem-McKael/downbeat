import React, { useEffect, useState } from 'react'
import kick1 from '../../../src/assets/sounds/kick1.wav'
import useSound from 'use-sound';
import Tile from '../Tile/Tile';
import './Track.css'

export default function Track({}) {

    const [trackInputs, setTrackInputs] = useState([1, 1, 1, 1, 1, 0, 1, 0]);
    const [playSound, {stop}] = useSound(kick1, {volume: .25, interrupt: true});
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

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
            }, 300);
        } else {
            clearInterval(playback);
            setTrackIndex(0);
        }

        return () => clearInterval(playback);
    }, [isPlaying, trackInputs, trackIndex]);

    function stopPlayback() {
        stop();
        setIsPlaying(false);
        setTrackIndex(0);
    }

    function startPlayback() {
        setIsPlaying(true);
    }

    function updateBinaryTrackInput(idx) {
        const updatedInputs = trackInputs;
        console.log('before: ', updatedInputs)
        updatedInputs[idx] = (updatedInputs[idx] + 1) % 2;
        console.log('after: ', updatedInputs)
        setTrackInputs(updatedInputs);
        console.log('state: ', trackInputs);
    }

    return (
        <div>
            <div>
                <button onClick={playSound}>Kick</button>
                <button onClick={stopPlayback}>Stop</button>
                <button onClick={startPlayback}>Start</button>
            </div>
            <div className='track'>
                <p>{}</p>
                {trackInputs.map((value, idx) => <Tile key={idx} index={idx} value={value} trackIndex={(trackIndex + 7) % 8} updateBinaryTrackInput={updateBinaryTrackInput}/>)}
            </div>
        </div>
    )
}