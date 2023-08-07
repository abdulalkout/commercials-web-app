import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD4OMvy8Z2nc24Y7lZdqZuJgNNtOQYkrek",
    authDomain: "commercial-web-application.firebaseapp.com",
    projectId: "commercial-web-application",
    storageBucket: "commercial-web-application.appspot.com",
    messagingSenderId: "727806405304",
    appId: "1:727806405304:web:c4375aa694d69cf738a24d"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});


export const auth = firebase.auth();
export const signInWithGooglePopup = () => auth.signInWithPopup(googleProvider);

export default firebaseApp; 



// FireStore 
export const db = firebase.firestore();
export const createUserDocumentFromAuth = async (userAuth, additionalinformation={}) => {

    if(!userAuth) return;

    // user document refrence
    const userDocRef = db.collection('users').doc(userAuth.uid);

    // check the user and set if not exists 
    const userSnapshot = await userDocRef.get();
    if (!userSnapshot.exists) {
        const { displayName, email, uid } = userAuth;
        const createdAt = new Date();

        try {
            await userDocRef.set({
                displayName,
                email,
                uid,
                createdAt,
                ...additionalinformation,
            });
        } catch (error) {
            console.error('Error creating user document:', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        return userCredential;
        // const user = userCredential.user;
        // Optionally, you can do something with the new user, such as saving additional data.
        // console.log('User created:', user);
    } catch (error) {
        console.error('Error creating user:', error);
    }
};