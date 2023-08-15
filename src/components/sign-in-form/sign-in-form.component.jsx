import React from "react";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { SigninContainer, ButtensContainer, SigninTitle } from "./sign-in-form.style";
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
            await signInWithGooglePopup();
        } catch (error) {
            console.log('the Popup was closed');
        } 
    }

    // handle once the form submited 
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            // Set the user in the context after successful authentication
       
            // Clear form fields
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
        <SigninContainer>
            <SigninTitle>Already have an account? </SigninTitle>
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
            
                <ButtensContainer>
                    <Button type='submit' >SIGN IN</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </ButtensContainer>
            </form>
        </SigninContainer>
    )
}

export default SignInForm;
