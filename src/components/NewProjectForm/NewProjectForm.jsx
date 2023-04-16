import React, { useEffect } from 'react';
import { useState } from 'react';
import * as projectsAPI from '../../utilities/projects-api';

export default function NewProjectForm( {setCurrentProject} ) {
    const [newProjectDetails, setNewProjectDetails] = useState({
        title: '',
        tracks: [],
        bpm: 120,
        error: ''
    });

    const [error, setError] = useState('');


    function handleChange(evt) {
        setNewProjectDetails({ ...newProjectDetails, [evt.target.name]: evt.target.value });
        setError('');
    };

    async function handleSubmit(evt) {
        evt.preventDetault();
        try {
            const project = await projectsAPI.createProject(newProjectDetails);
            setCurrentProject(project);
        } catch (error) {
            console.log(error);
            setError('Sorry, something went wrong.')
        }
    }

    

  return (
    
        <div>
            <div className='new-project-container'>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Project Title</label>
                    <input type="text" name="title" value={newProjectDetails.title} onChange={handleChange} required />
                    <button type='submit'>SIGN UP</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{newProjectDetails.error}</p>
        </div>

    )

}
