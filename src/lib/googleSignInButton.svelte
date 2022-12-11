<script>
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();
    import userData from "./shared/stores/userData";
    import {getAuth, signInWithPopup, GoogleAuthProvider, sendEmailVerification, applyActionCode, onAuthStateChanged} from "firebase/auth"
     // Import the functions you need from the SDKs you need
    import { initializeApp, getApps, getApp } from "firebase/app";
    import { getFirestore, getDocs, collection, getDoc, doc, setDoc } from "firebase/firestore";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
            
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
    /**
	 * @type {import("@firebase/auth").User | null}
	*/
    let publicUser;
    let publicUserData;
    let UserData = {};
    // @ts-ignore
    let currentUser = getAuth(app).currentUser!=null ? getAuth(app)?.currentUser : undefined;
    
    userData.subscribe((value)=>{
        // @ts-ignore
        UserData = value;
    })
    onAuthStateChanged(getAuth(app), user=>{
        publicUser=user;
    });

    const getDatabaseData = async () => {
        const currentUser = getAuth(app).currentUser;
        if (getAuth(app).currentUser != null) {
            // @ts-ignore
            const docRef = doc(db, "users", currentUser?.displayName);
            const docSnap = getDoc(docRef);
            if ((await docSnap).exists()) {
                return (await docSnap).data();
            } else {
                // @ts-ignore
                setDoc(doc(db, "users", currentUser?.displayName), {
                    credits:1000,
                    banned:false,
                    shadowBanned:false,
                    displayName:currentUser?.displayName,
                    email:currentUser?.email,
                    emailVerified:currentUser?.emailVerified,
                    public:false,
                    tier:"free",
                    private:{
                        totalPaid:0
                    }
                });
                return (await docSnap).data();
            };
        };
    };

    /**cu
     * @param {import("firebase/auth").User} user User.
     * @param {import("firebase/auth").Auth} auth Auth.
    */
    const verifyEmail  = async (user, auth)=> {
        await sendEmailVerification(user)
        const code = prompt(`You need to verify your email! We have sent an email to ${user.email}. Check your inbox and if its not there, then check your spam folder. Type the code below.`);
        if (!code || code == "") {
            alert("Pleaes enter code!");
            verifyEmail(user, auth);
            return;
        };
        applyActionCode(auth, code).then(()=>{
            alert("Successfully logged in!")
        }).catch(()=>{
            alert("Incorrect code! (or an error occurred).")
            verifyEmail(user,auth);
        });
    };
    const openGoogleSignInPopup = async ()=>{
        const e = window.event;
        if (e?.target != document.querySelector("button.login-with-google-btn")) return;
        // @ts-ignore
        const auth = getAuth(app);
        const data  = await signInWithPopup(auth, new GoogleAuthProvider())
        const user = data.user;
        const name = user.displayName;
        const email = user.email;
        if (!user.emailVerified) {
            await verifyEmail(user, auth);
        } else {
            addNotification({text:"Successfully logged in!",position:"bottom-right",type:"success",removeAfter:2000})
            getDatabaseData();
        };
        return false;
    };
    $: signedIn = getAuth(app).currentUser ? true:false;

    onAuthStateChanged(getAuth(app), user=>{
        signedIn = user ? true:false;
    });
    const signInWithGoogle = (/** @type {Event | undefined} */ e)=>{
        if (!e) e = window.event;
        onAuthStateChanged(getAuth(app), async user=>{

            // @ts-ignore
            if (!user && e?.target == document.querySelector("button.login-with-google-btn")) await openGoogleSignInPopup(); 
        })
    }
	
</script>
<span>
<button on:click|preventDefault={signInWithGoogle} disabled="{signedIn ? true:false}" class="login-with-google-btn shadow-md">
    Sign in with Google
</button>
</span>





<style>
    
    .login-with-google-btn { 
        transition: background-color 0.3s, box-shadow 0.3s;
        padding: 12px 16px 12px 42px;
        border: none;
        border-radius: 3px;
        color: #757575;
        font-size: 18px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
        background-color: white;
        background-repeat: no-repeat;
        background-position: 12px, center;
    }
    .login-with-google-btn:hover {
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    .login-with-google-btn:active {
        outline:none;
        background-color: #eeeeee;
    }
    .login-with-google-btn:focus {
        outline: none;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
    }
    .login-with-google-btn:disabled {
        filter: grayscale(1) blur(.05em);
        background-color: #ebebeb;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
        cursor: not-allowed;
   }
   .login-with-google-btn:disabled:hover{ 
    filter:blur(.1em) grayscale(1);
   }
</style>