<svelte:head>
    <title>New Page</title>
</svelte:head>
<script>
	import { browser } from '$app/environment';
	import { goto } from "$app/navigation";
    import { getAuth } from "firebase/auth";
    import { getApp } from "firebase/app";
    export const prerender = false;
    if (browser) {
        try {
            const auth = getAuth(getApp())
            if (!auth.currentUser || auth.currentUser==null){
                goto("/login").catch(error => {
                    location.replace("/login");
                });
            };
        } catch {
           goto("/login").catch(e => {
            location.replace("/login");
           })
        };
    }
</script>
<div class="text-column">
    <h1>Site Creator</h1>
    <p>Use our simple drag & drop system to make complex websites!</p>
    <button on:click={()=>{goto("/new/make")}}>Show me</button>
</div>
<style>
    button {
        width:max-content;
        padding: .5em;
        font-size: 1.5em;
        display:flex;
        align-self: center;
        background:white;
        border: none;
        transition: 100ms ease-in-out;
        border-radius:0.25em;
    }
    button:active {
        background:lightgray;
    }
</style>