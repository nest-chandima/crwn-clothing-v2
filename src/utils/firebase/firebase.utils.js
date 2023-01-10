import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCwWbCABnTiltUA1MJKR6qUmhpc2z6Ddc8",
    authDomain: "crwn-clothing-9c2ed.firebaseapp.com",
    projectId: "crwn-clothing-9c2ed",
    storageBucket: "crwn-clothing-9c2ed.appspot.com",
    messagingSenderId: "689117462902",
    appId: "1:689117462902:web:a4509e3a94af10edbd7a57"
};


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('Error in Creating a User', error.message);
        }
    }

    return userDocRef;

};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);