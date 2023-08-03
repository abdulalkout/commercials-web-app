import React from 'react';
import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
        <div>
            <h1>
                Signin page ddd
            </h1>
            <button onClick={logGoogleUser}>sign in</button>
        </div>
    );
}

export default SignIn;

// try {
        //     const response = await signInWithGooglePopup();
        //     console.log(response);
        // } catch (error){
        //     console.error('Google Sign In Error:', error);
        // }