import React from 'react'
import './TrackHeader.css'

export default function TrackHeader({track, deleteTrack, updateSample}) {

  function handleDeleteTrack() {
    deleteTrack(track._id);
  }

  function handleSelect(evt) {
    updateSample(evt.target.value);
  }

  return (
    <div className='trackHeader'>
      <div>{track.title}</div>
      <select><label>Sample</label>
          <option onClick={handleSelect}>kick1</option>
          <option onClick={handleSelect}>kick2</option>
          <option onClick={handleSelect}>kick3</option>
      </select>
      <button onClick={handleDeleteTrack}>Delete</button>
    </div>
    // This component should contain the name of the current sound and a delete option.
    // Eventually, the user should be able to change the sound directly from here
  )
}
