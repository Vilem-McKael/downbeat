import React from 'react'
import './TrackHeader.css'

export default function TrackHeader({track, sampleName, deleteTrack, changeSample}) {

  function handleDeleteTrack() {
    deleteTrack(track._id);
  }

  function handleSelect(evt) {
    const atts = evt.target.value.split('_');
    changeSample(atts[0], atts[1]);
  }

  return (
    <div className='trackHeader'>
      <div className='mb-[.5vmin] mt-[.5vmin]'>{sampleName}</div>
      <select className='text-black mb-[.5vmin] bg-black text-white p-[.2vmin]' defaultValue={`${sampleName}`} onChange={handleSelect}>
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
          <option value='openhats_openhat1'>openhat1</option>
          <option value='openhats_openhat2'>openhat2</option>
          <option value='toms_tom1'>tom1</option>
          <option value='toms_tom2'>tom2</option>
      </select>
      <button className='pb-0 pt-0 mb-[.5vmin]' onClick={handleDeleteTrack}>Delete</button>
    </div>
  )
}
