import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, DocumentSnapshot } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCwWbCABnTiltUA1MJKR6qUmhpc2z6Ddc8",
    authDomain: "crwn-clothing-9c2ed.firebaseapp.com",
    projectId: "crwn-clothing-9c2ed",
    storageBucket: "crwn-clothing-9c2ed.appspot.com",
    messagingSenderId: "689117462902",
    appId: "1:689117462902:web:a4509e3a94af10edbd7a57"
};


const app = initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const db = getFirestore();

export const addCollectionAndDocumets = async(collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('Done');

}

export const getCategoriesAndDocuments = async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnaapshot = await getDocs(q);
    return querySnaapshot.docs.map((docSnapshot) => docSnapshot.data());


    // .reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});
    // return categoryMap;
}

export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    // console.log('OKAYYYYYY', userAuth);
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('Error in Creating a User', error.message);
        }
    }

    return userSnapshot;

};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRederect = () => signInWithGoogleRederect(auth, googleProvider);


export const CreateAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;


    return await createUserWithEmailAndPassword(auth, email, password);
}

export const SignAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const SignOutUser = async() => await signOut(auth);

export const OnAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurruntUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    })
}