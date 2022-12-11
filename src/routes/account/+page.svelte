<svelte:head>
    <title>Account</title>
</svelte:head>
<script>
    import swal from "sweetalert";
    import "../+page.js";
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();
	import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { getApp, getApps, initializeApp } from "firebase/app";
    import SignOutButton from "$lib/SignOutButton.svelte";



    const firebaseConfig = {
        apiKey: "AIzaSyBf4SNo_5ENrOwDnVXqWUNkHmLZL1MxYGc",
        authDomain: "localhost:5173",
        projectId: "cryptly",
        storageBucket: "cryptly.appspot.com",
        messagingSenderId: "473744246040",
        appId: "1:473744246040:web:4a8bb86e55b8cee2bd0a6d",
        measurementId: "G-4L7L6NNTVW"
    };
    import {doc, getDoc, getFirestore} from "firebase/firestore";
    
  

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    //const auth  = getAuth(app);
    const db = getFirestore(app);
    export const getAccountData = async () => {
        const currentUser = getAuth(app)?.currentUser;
        if (currentUser != null) {
            // @ts-ignore
            const docRef = doc(db, "users", currentUser?.displayName);
            const docSnap = getDoc(docRef);
            if ((await docSnap).exists()) {
                return (await docSnap).data();
            } else {
                return "notnexistant";
            };
        };
    };
    console.log(getAccountData);
    onMount(()=>{
        onAuthStateChanged(getAuth(app), user=>{
            if (!user) { 
                try {
                    location.replace("/login");
                } catch (e) {
                    console.log(e);
                    addNotification({text:"Error",position:"bottom-right",type:"error",removeAfter:2000})
                    swal("Error", "An error occured and the page must reload.", "error").then(()=>{
                        // @ts-ignore
                        location = "/login";
                        location.reload();
                    }).catch(()=>{
                        // @ts-ignore
                        location = "/login";
                        location.reload();
                    });
                };
            };
        });
    });
    let content = "subscription"
    onMount(()=>{
        content = location.hash;
        // @ts-ignore
        document.querySelectorAll(".navlink").forEach(link => {
            link.classList.remove("active")
        })
        document.querySelector(`#${content.replace("#","")}-link`)?.classList.add("active");
    })
    $: contentID = content;
    /**
     * This function is used in the navbar, to change the style of the active link.
     * @param {Event | undefined } e Event (click event)
     */
    const change = (e) => {
        if (!e) e = window.event; // <-- for Chrome <89, Firefox (I forgot versions), and Safari. 
        // If you have been used to JS for a bit, you may think that {} needs to be used above, but no. In modern JS, this is unnecessary. Of course, for multi-line if statements, you do need the brackets. 
        let list = document.querySelectorAll(".navbar ul li a");

        list.forEach(elem => {
            elem.classList.remove("active");
        });
        // Note the below comment is only if you are using a type checker, if you aren't then you can remove this. (the comment).
        // @ts-ignore
        e?.target.classList.add('active');
        // @ts-ignore
        content = e?.target.textContent.toLowerCase();
    }
    const applyChanges = ()=>{
        addNotification({text:"Changes Applied", type:"success", position:"bottom-right", removeAfter:2000})
        swal("Applied!", "Your changes have been applied.", "success");
    }
</script>
<main>
    <div class="account bg-white rounded-xl shadow-lg">
        <h2>Account</h2>
        <div class="navbar w-60 bg-white px-1 absolute ">
            <ul class="relative">
                <li class="relative">
                    <a on:click={(e)=>{change(e)}} id="subscription-link" class="navlink flex active items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#subscription" data-mdb-ripple="true" data-mdb-ripple-color="dark"><i class="fa-solid fa-coins"></i> &nbsp; Subscription</a>
                </li>
                <li class="relative">
                    <a on:click={(e)=>{change(e)}} id="security-link" class="navlink flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#security" data-mdb-ripple="true" data-mdb-ripple-color="dark"><i class="fa-solid fa-lock"></i> &nbsp; Security</a>
                </li>
                <li class="relative">
                    <a on:click={(e)=>{change(e)}} id="settings-link" class="navlink flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#settings" data-mdb-ripple="true" data-mdb-ripple-color="dark"><i class="fa-solid fa-gear"></i> &nbsp; Settings</a>
                </li>
            </ul>
        </div>
        <div class="main">

            {#if contentID.includes("settings")}
                <div class="settings" id="settings">
                    <h3>Settings</h3>
                </div>
            {:else if contentID.includes("subscription")}
                <div class="subscription" id="subscription">
                    <h3>Subscription</h3>
                </div>
            {:else if contentID.includes("security")}
                <div class="security" id="security">
                    <h3>Security</h3>
                    <form action="#" on:submit|preventDefault|stopPropagation class="margin-4">
                        <input type="checkbox" name="2fa" id="2-fa">
                        <label for="2-fa">2-Factor Authentication</label><br>
                        <span>
                            <button on:click={applyChanges} class="apply shadow-md">
                                <i class="fa-solid fa-floppy-disk"></i> &nbsp; Apply
                            </button>
                        </span>
                        
                        <div class="absolute bottom-8 right-28">
                            <SignOutButton/>
                        </div>
                    </form>
                </div>
            {/if}
        </div>
</main>

<style lang="scss">
    $fonts: Helvectia, sans-serif;
    * {
        font:100%, $fonts;
    }
    div.main {
        h3 {
            font-size:x-large;
            color:black;
        }
    }
    @media (width: 767px) {
        div.navbar ul.relative li.relative a {
            content:initial;
        }
    }
    div.main {
        width:85%;
        height:85%;
        color:black;
        display:block;
        z-index:99999999;
        position:relative;
        margin-left:clamp(256px, 22.5%, 25%);
    }
    div.main button.apply {
        transition: box-shadow .25s ease-in-out;
        background:white;
        padding:1em 0.7em 0.7em 1em;
    }
    div.main button.apply:hover {
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    
    div.navbar { 
        border-right: 2px solid black;
        height:inherit;
    }
    div.navbar ul.relative li a:hover {
        text-decoration: none;
    } div.navbar ul.relative li a.active {
        background:rgb(240, 240, 240);
    }
    div.account { 
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        width:80%;
        height:80%;
        color:black;

    }
    div.account h2 {
        font-size:xx-large;
        margin:1.5%;
    }
</style>
