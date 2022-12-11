<script>
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();
    

    import {getAuth, onAuthStateChanged, signInAnonymously} from "firebase/auth"
     // Import the functions you need from the SDKs you need
    import { initializeApp, getApps, getApp } from "firebase/app";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
            
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBf4SNo_5ENrOwDnVXqWUNkHmLZL1MxYGc",
        authDomain: "cryptly-a7bcf.firebaseapp.com",
        projectId: "cryptly",
        storageBucket: "cryptly.appspot.com",
        messagingSenderId: "473744246040",
        appId: "1:473744246040:web:4a8bb86e55b8cee2bd0a6d",
        measurementId: "G-4L7L6NNTVW"
    };
            
    // Initialize Firebase
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

    const signIn= async ()=>{
        const credentials = await signInAnonymously(getAuth(app));
        console.log(credentials);
        onAuthStateChanged(getAuth(app),user=>{
            if(user){
                addNotification({text:"Signed In!",position:"bottom-right",type:"success",removeAfter:2000});
            };
        });
    };
</script>
<button on:click|preventDefault={signIn} class="sign-in">
    <i class="fa-solid fa-circle-user"></i>
    Sign In Anonymously
</button>

<style>
    .sign-in {
        transition: background-color 0.3s, box-shadow .3s;
        padding: 12px 16px 12px 24px;
        color: #757575;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
        background-color: white;
        border: none;
        font-size: 18px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    }
    .sign-in:hover {
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
    }
    .sign-in i {
        position: relative;
        left:-24px;
        margin-left:16px;
        margin-right:-12px;
    }
</style>