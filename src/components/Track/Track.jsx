import React, { useEffect, useState } from 'react'
import kick1 from '../../../src/assets/sounds/kick1.wav'
import useSound from 'use-sound';

export default function Track({}) {

    const [trackInputs, setTrackInputs] = useState([1, 0, 1, 0, 1, 0, 1, 1]);
    const [audio, setAudio] = useState(new Audio(kick1));
    const [playSound, {stop}] = useSound(kick1, {volume: .50, interrupt: true});
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(function() {
        // https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
        let playback = null;
        if (isPlaying) {
            playback = setInterval(() => {
                if (isPlaying && trackInputs[trackIndex]) {
                    playSound();
                } else {
                    stop();
                }
                setTrackIndex((trackIndex + 1) % 8);
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

    return (
        <div>
            <div>
                <button onClick={playSound}>Kick</button>
                <button onClick={stopPlayback}>Stop</button>
                <button onClick={startPlayback}>Start</button>
            </div>
            <div>
                
            </div>
        </div>
    )
}