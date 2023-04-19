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
        <h1>AuthPage</h1>
        <button onClick={handleClick}>{isNewUser ? 'Already have an account? Log in here' : 'Create a new account'}</button>
        { isNewUser ?
            <>
                <SignUpForm setUser={updateUser} />
            </>
            :
            <>
                <LoginForm setUser={updateUser} />
            </>
        }
    </>
  )
}
