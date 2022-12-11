<script>
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { initializeApp, getApp, getApps } from "firebase/app";
    import { getNotificationsContext } from "svelte-notifications"

    const { addNotification } = getNotificationsContext();

    const firebaseConfig = {
        apiKey: "AIzaSyBf4SNo_5ENrOwDnVXqWUNkHmLZL1MxYGc",
        authDomain: "cryptly-a7bcf.firebaseapp.com",
        projectId: "cryptly",
        storageBucket: "cryptly.appspot.com",
        messagingSenderId: "473744246040",
        appId: "1:473744246040:web:4a8bb86e55b8cee2bd0a6d",
        measurementId: "G-4L7L6NNTVW"
    };

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    $: signedIn = getAuth(app).currentUser != null ? true:false;

    onAuthStateChanged(getAuth(app), user=>{
        signedIn = user ? true:false;
    });

    const signOut = (/** @type {Event | undefined} */ e)=>{
        if (!e) e = window.event;
        const auth = getAuth(app);
        onAuthStateChanged(auth, user=>{
            if (user && e?.target == document.querySelector("button.sign-out")) {
                auth.signOut();
                signedIn = getAuth(app).currentUser != null ? true:false;
                addNotification({text:"Signed out!",position:"bottom-right",type:"success",removeAfter:2000});
                return;
            };
        });
    };
</script>

<span>
<button on:click|preventDefault={signOut} disabled="{signedIn ? false:true}" class="sign-out shadow-md"><i class="fa-solid fa-right-from-bracket"></i> Sign Out</button>
</span>
<style>
    .sign-out {
        color:black;
        transition: background-color 0.3s, box-shadow .3s;
        padding: 12px 16px 12px 24px;
        color: #757575;
        background-color: white;
        border: none;
        font-size: 18px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    }
    .sign-out:hover {
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    .sign-out:disabled {
        filter:blur(.1em) grayscale(1);
        cursor:not-allowed;
    }
    .sign-out:disabled:hover {
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
    }
    .sign-out i {
        position: relative;
        left:-24px;
        margin-left:16px;
        margin-right:-12px;
    }
</style>