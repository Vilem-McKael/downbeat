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

    function handleChange(evt) {
        setUserDetails({ ...userDetails, [evt.target.name]: evt.target.value });
        setError('');
    }

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

    function isDisabled() {

        userDetails.password !== userDetails.confirm;    

    }

  return (
    
    <div>
        <div className='signup-form-container'>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                <label>name:</label>&nbsp;&nbsp;
                <input type="text" name="name" value={userDetails.name} onChange={handleChange} required />
                </div><br/>
                <div className='flex justify-between'>
                <label>email:</label>&nbsp;&nbsp;
                <input type="email" name="email" value={userDetails.email} onChange={handleChange} required />
                </div><br/>
                <div className='flex justify-center text-[1.5vmin]'>
                <label>password must be 8 or more characters long</label>&nbsp;&nbsp;
                </div>
                <div className='flex justify-between'>
                <label>password:</label>&nbsp;&nbsp;
                <input type="password" name="password" value={userDetails.password} onChange={handleChange} required />
                </div><br/>
                <div className='flex justify-between'>
                <label>confirm:</label>&nbsp;&nbsp;
                <input type="password" name="confirm" value={userDetails.confirm} onChange={handleChange} required />
                </div><br/>
                <div className='flex justify-center'>
                <button type='submit' disabled={isDisabled()}>SIGN UP</button>
                </div>
            </form>
        </div>
        <div className='flex justify-center mb-2 mt-2'>
        <p className="error-message">&nbsp;{userDetails.error}</p>
        </div>
    </div>

  )
}
