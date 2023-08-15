import { queries } from '@testing-library/react';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/firestore';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


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


// adding collection to fireStore
export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    const collectionRef = db.collection(collectionKey);
    const batch = db.batch();

    objectsToAdd.forEach((object)=>{
        const docref = collectionRef.doc(object.title.toLowerCase());
        batch.set(docref, object)
    })

    await batch.commit();
    console.log('done');
}

// export const getCategoriesAndDocuments = async () => {
//     const collectionRef = db.collection('categories');

//     try {
//         const querySnapshot = await collectionRef.get();

//         if (querySnapshot.empty) {
//             console.log('No documents found in "categories" collection.');
//             return null;
//         }

//         const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//             const { title, items } = docSnapshot.data();
//             acc[title.toLowerCase()] = items;
//             return acc;
//         }, {});

//         return categoryMap;
//     } catch (error) {
//         // Handle any errors here
//         console.error('Error fetching categories:', error);
//         throw error;
//     }
// };


export const getCategoriesAndDocuments = async () => {
    const collectionRef = db.collection('categories');
    // const q = collectionRef.queries();

    const querySnapShot = await collectionRef.get();


    const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})


    return categoryMap;
}

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
    } catch (error) {
        console.error('Error creating user:', error);
    }
};



//signInWithEmailAndPassword
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    const userCredential = await auth.signInWithEmailAndPassword(email, password)
    return userCredential;
};


export const signOutUser = async() => await auth.signOut();


export const onAuthStateChangeListener = (callback) => auth.onAuthStateChanged(callback);