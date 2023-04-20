import React, { useEffect } from 'react';
import { useState } from 'react';
import * as projectsAPI from '../../utilities/projects-api';
import { useNavigate } from 'react-router-dom';

export default function NewProjectForm( {} ) {
    const [newProjectDetails, setNewProjectDetails] = useState({
        title: '',
        tracks: [],
        bpm: 120,
        error: ''
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();


    function handleChange(evt) {
        setNewProjectDetails({ ...newProjectDetails, [evt.target.name]: evt.target.value });
        setError('');
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const projectData = {
                title: newProjectDetails.title,
                tracks: [],
                bpm: 120
            }
            const project = await projectsAPI.createProject(projectData)
            .then(project => navigate(`/project/${project._id}`));
            
        } catch (error) {
            console.log(error);
            setError('Sorry, something went wrong.')
        }
    }

    

  return (
    
        <div>
            <div className='new-project-container'>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label className='text-xl'>project title: </label><br/><br/>
                    <input className='bg-black text-white text-xl rounded-lg pl-2 w-4/5' type="text" name="title" value={newProjectDetails.title} onChange={handleChange} required /><br/><br/><br/>
                    <button className='text-black bg-black text-white pr-4 pl-4 text-xl' type='submit'>create project</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{newProjectDetails.error}</p>
        </div>

    )

}
