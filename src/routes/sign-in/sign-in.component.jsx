import 'firebase/auth'; 
import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

    // sign in user with google popup
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
        <div>
            <h1>
                Signin page ddd
            </h1>
            <button onClick={logGoogleUser}>sign in with Google</button>
            <SignUpForm />
        </div>
    );
}

export default SignIn;   