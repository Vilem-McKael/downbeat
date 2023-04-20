import React, { useState } from 'react'
import './Tile.css'

export default function Tile({index, value, updateBinaryTrackInput, trackIndex}) {

    const [tileVal, setTileVal] = useState(value);

    function handleClick() {
        console.log('before (tile): ', index, value);
        updateBinaryTrackInput(index);
        setTileVal((tileVal + 1) % 2);
        console.log('after (tile): ', index, value);
    }

    const active = index === trackIndex;
    // console.log(index, trackIndex);

  return (
    <>
        <div className={`tile ${active ? 'active' : ''}`}>
            <button className={`indicator ${tileVal ? 'on' : 'off'}`} onClick={handleClick} ></button>
        </div>
    </>
  )
}
