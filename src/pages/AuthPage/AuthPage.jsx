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
    <div className='flex flex-col justify-center items-center'>
    <img className='w-80 m-auto' src='https://i.imgur.com/5jtUS3f.png' />
        <div className='flex flex-col justify-center items-center bg-amber-700 text-lg w-3/5 rounded-xl'>
            <div className='mt-8'></div>
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
    </div>
    </>
  )
}
