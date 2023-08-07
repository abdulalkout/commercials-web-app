import React from "react";
import Button from "../button/button.component";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.style.scss';
import {signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    auth, 
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';



const SignInForm = () => {

    const defultFormFields = {
        email : '',
        password : '',
    }
    // useState hook
    const [formFields, setFormFields] = useState(defultFormFields);
    const {email, password} = formFields;

    // clear form field 
    const reSetFormFields = ()=> {
        setFormFields(defultFormFields);
    }

    // sign in user with google popup
    const signInWithGoogle = async () => {
        try{
            const {user} = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user);
        } catch (error) {
            console.log('the Popup was closed');
        }
    }

    // handle once the form submited 
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email,password);
            console.log(response);
            // clear form
            reSetFormFields();

        } catch (error){
            switch (error.code){
                case 'auth/wrong-password':
                    alert('incorrect passwored');
                    break;
                case 'auth/user-not-found':
                    alert('incorrect Email');
                    break;
                default :
                    console.log(error);
            }
        }
    }

    // handle the change in each field
    const handleChange =(event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name] : value});
    }


    return(
        <div className="sign-in-container">
            <h2>Already have an account? </h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />
                <FormInput
                    label='password' 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />
            
                <div className="buttens-container">
                    <Button type='submit' buttonType='inverted' >SIGN IN</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;


// const signIn = () => {
//     auth.signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             console.log('please make sure of Email or passwored ')
//         });
// }