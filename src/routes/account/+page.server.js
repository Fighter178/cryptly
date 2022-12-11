import {getFirestore, doc, getDoc} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getApps, getApp, initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBf4SNo_5ENrOwDnVXqWUNkHmLZL1MxYGc",
    authDomain: "localhost:5173",
    projectId: "cryptly",
    storageBucket: "cryptly.appspot.com",
    messagingSenderId: "473744246040",
    appId: "1:473744246040:web:4a8bb86e55b8cee2bd0a6d",
    measurementId: "G-4L7L6NNTVW"
};
        
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

if (!getAuth(app).currentUser) {
    // @ts-ignore
    const docRef = doc(db, "users", getAuth(app).currentUser?.displayName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data());
    }
}
