import React from 'react'
import './TrackHeader.css'

export default function TrackHeader({track, sampleName, deleteTrack, changeSample}) {

  function handleDeleteTrack() {
    console.log('trackHeader trackId: ', track._id);
    deleteTrack(track._id);
  }

  function handleSelect(evt) {
    const atts = evt.target.value.split('_');
    console.log(atts);
    changeSample(atts[0], atts[1]);
  }

  return (
    <div className='trackHeader'>
      <div>{sampleName}</div>
      <select className='text-black' defaultValue={`${sampleName}`} onChange={handleSelect}>
          <option value='sample'>sample:</option>
          <option value='kicks_kick1'>kick1</option>
          <option value='kicks_kick2'>kick2</option>
          <option value='kicks_kick3'>kick3</option>
          <option value='snares_snare1'>snare1</option>
          <option value='snares_snare2'>snare2</option>
          <option value='snares_snare3'>snare3</option>
          <option value='hihats_hihat1'>hihat1</option>
          <option value='hihats_hihat2'>hihat2</option>
          <option value='hihats_hihat3'>hihat3</option>
          <option value='claps_clap1'>clap1</option>
          <option value='claps_clap2'>clap2</option>
          <option value='claps_clap3'>clap3</option>
      </select>
      <button onClick={handleDeleteTrack}>Delete</button>
    </div>
    // This component should contain the name of the current sound and a delete option.
    // Eventually, the user should be able to change the sound directly from here
  )
}
