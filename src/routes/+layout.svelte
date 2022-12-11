<script>
	import Header from './Header.svelte';
	import './styles.css';
	import Notifications from 'svelte-notifications';
	import {getApp, getApps, initializeApp} from "firebase/app"; 
	import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
	import "./app.css";

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
	const appCheck = initializeAppCheck(app, {
		provider:new ReCaptchaV3Provider("6LcODkwjAAAAANOEEWFqvsizIvAPekS3fUnPL0rc"),
		isTokenAutoRefreshEnabled:true
	});
</script>
<svelte:head>
	<link rel="scss" href="styles.scss">
</svelte:head>
<div class="app">
	<Header />
	<main>
		<Notifications>
		    <slot />
		</Notifications>
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
