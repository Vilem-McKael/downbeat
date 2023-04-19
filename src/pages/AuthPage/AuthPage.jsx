import React from 'react';
import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage( { updateUser } ) {

    const [isNewUser, setIsNewUser] = useState(false);

    function handleClick() {
        setIsNewUser(!isNewUser);
    }

  return (
    <>
    <div className='flex flex-col justify-center content-start bg-amber-700 mt-56 text-lg'>
        <h1 className='text-4xl mt-4'>downbeat</h1><br/>
        { isNewUser ?
            <>
                <SignUpForm setUser={updateUser} />
            </>
            :
            <>
                <LoginForm setUser={updateUser} />
            </>
        }
        <button onClick={handleClick}>{isNewUser ? 'Already have an account? Log in here' : 'New user? Create a new account'}</button><br/>
    </div>
    </>
  )
}
