import React from 'react'

export default function ProjectControls({stopPlayback, startPlayback, handleSaveProject, handleDeleteProject}) {
  return (
    <div>
        <button onClick={stopPlayback}>Stop</button>
        <button onClick={startPlayback}>Start</button>
        <button onClick={handleSaveProject}>Save Project</button>
        <button onClick={handleDeleteProject}>Delete Project</button>
    </div>
  )
}
