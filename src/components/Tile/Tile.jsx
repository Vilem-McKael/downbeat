import React, { useState } from 'react'
import './Tile.css'

export default function Tile({index, value, updateBinaryTrackInput, trackIndex}) {

    const [tileVal, setTileVal] = useState(value);

    function handleClick() {
        updateBinaryTrackInput(index);
        setTileVal((tileVal + 1) % 2);
    }

    const active = index === trackIndex;

  return (
    <>
        <div className={`tile ${active ? 'active' : ''}`}>
            <button className={`indicator ${tileVal ? 'on' : 'off'}`} onClick={handleClick} ></button>
        </div>
    </>
  )
}
