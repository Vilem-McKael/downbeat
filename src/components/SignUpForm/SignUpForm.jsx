import React, { useState } from 'react'
import * as usersService from '../../utilities/users-service';

export default function SignUpForm({ setUser }) {

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    })

    const [error, setError] = useState('');

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formData = {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password
            }
            const user = await usersService.signUp(formData);
            setUser(user);
        } catch {
            setUserDetails({ ...userDetails, error: 'Sign Up Failed - Try Again'});
        }
    }

    function handleChange(evt) {
        setUserDetails({ ...credentials, [evt.target.name]: evt.target.value });
        setError('');
    }
    
    const disable = userDetails.password !== userDetails.confirm;

  return (
    
    <div>
        <div className='signup-form-container'>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={userDetails.name} onChange={handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={userDetails.email} onChange={handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={userDetails.password} onChange={handleChange} required />
                <label>Confirm</label>
                <input type="password" name="password" value={userDetails.confirm} onChange={handleChange} required />
                <button type='submit' disabled={userDetails.password !== userDetails.confirm}>SIGN UP</button>
            </form>
        </div>
        <p className="error-message">&nbsp;{userDetails.error}</p>
    </div>

  )
}
