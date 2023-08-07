import React from "react";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.style.scss';
import Button from "../button/button.component";


const defultFormFields = {
    displayName: '',
    email : '',
    password : '',
    confirmPassword : ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    // clear form field 
    const reSetFormFields = ()=> {
        setFormFields(defultFormFields);
    }

    // handle once the form submited 
    const handleSubmit = async (event) =>{
        event.preventDefault();
        if (password !== confirmPassword){
            alert('Password does not match');
            return;
        }
        try {
            const {user} =  await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            // clear form
            reSetFormFields();

        }catch (error){
            if(error.code === "auth/email-already-in-use"){
                alert("The email address is already in use by another account.")
            } else {
                console.log('error signing in with email and password', error.message);
            }
        }
    }

    // handle the change in each field
    const handleChange =(event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name] : value});
    }

    return (
        <div className="sign-up-container">
            <h2>don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label='password' type="password" required onChange={handleChange} name="password" value={password}/>

                <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;