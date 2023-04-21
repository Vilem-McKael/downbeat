import React from 'react'
import { useState } from 'react';
import * as usersService from '../../utilities/users-service'
import './LoginForm.css'

export default function LoginForm( { setUser } ) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value});
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const user = await usersService.login(credentials);
            setUser(user);
        } catch {
            setError('log in failed - try again');
        }
    }

    return (
        <div>
            <div className="login-form-container">
                <form className='flex flex-col items-center' autoComplete="off" onSubmit={handleSubmit}>
                    <label>email: </label>&nbsp;&nbsp;
                    <input type="email" name="email" value={credentials.email} onChange={handleChange} required /><br/>
                    <label>password: </label>&nbsp;&nbsp;
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required /><br/>
                    <button className='pl-4 pr-4' type="submit">log in</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}