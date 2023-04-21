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
                <form className='flex flex-col' autoComplete="off" onSubmit={handleSubmit}>
                    <div className='flex justify-center'>
                        <input className='bg-black text-[ivory] text-[3vmin] rounded-lg pl-2 pt-2 pb-2 mb-8 w-4/5 text-center' type="text" name="title" value={newProjectDetails.title} onChange={handleChange} maxLength={40} placeholder='project title' required />
                    </div>
                    <div className='flex justify-center'>
                        <button className='text-center text-[ivory] bg-black text-[ivory] text-[4vmin] inline-block w-3/5 mb-4' type='submit'>create project</button>
                    </div>
                </form>
            </div>
            <p className="error-message">&nbsp;{newProjectDetails.error}</p>
        </div>
    )
}
