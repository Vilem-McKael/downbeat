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
    <img className='h-48 m-auto mt-[12vmin]' src='https://i.imgur.com/IYJdzkF.png' />
        <div className='flex flex-col justify-center items-center bg-amber-700 text-lg w-3/5 rounded-xl mt-8 rounded-2xl ring-8 ring-black shadow-lg shadow-black/60 ring-inset'>
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
            <button onClick={handleClick}>{isNewUser ? 'already have an account? log in' : 'new user? create an account'}</button><br/>
        </div>
    </div>
    </>
  )
}
