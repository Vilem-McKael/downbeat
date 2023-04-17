import React, { useEffect } from 'react';
import { useState } from 'react';
import * as projectsAPI from '../../utilities/projects-api';
import { useNavigate } from 'react-router-dom';

export default function NewProjectForm( {currentProject, updateCurrentProject} ) {
    const [newProjectDetails, setNewProjectDetails] = useState({
        title: '',
        tracks: [],
        bpm: 120,
        error: ''
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(function() {
        if (currentProject.title) {
            navigate(`/project/${currentProject.title}`);
        }
    }, [currentProject]);


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
            .then(project => updateCurrentProject(project)); // *** why isn't this working?
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
                    <button type='submit'>CREATE</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{newProjectDetails.error}</p>
        </div>

    )

}
