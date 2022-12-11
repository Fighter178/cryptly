<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import SignInButton from '$lib/SignInButton.svelte';
	import accountAgeMgr from "$lib/shared/stores/accountAgeMgr.js";
	
	// @ts-ignore
	const closeAgeModal = ()=>{
		document.querySelector('div.age-check')?.setAttribute("style","display:none!important;");
		document.querySelector("div.age-check")?.setAttribute("data-focused", "false");
		accountAgeMgr.set("18");
	}
    let localAgeToggle = false;
	const click18 = ()=>{
	    // @ts-ignore
		const element = document.querySelector("input[type=checkbox]#under-18")
		// @ts-ignore
	    const checked = element?.checked;
	    // @ts-ignore
		document.querySelector("input[type=checkbox]#under-13").checked = checked;
		if (checked) {
			localAgeToggle = true;
			accountAgeMgr.set("18");
		}
	}
	const click13 = ()=>{
		if (!localAgeToggle) return;
		accountAgeMgr.set("13");
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

  
<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		Hello! Please use the login options below to continue. 
	</h1>
	<SignInButton/>
	<div class="age-check rounded-md" data-focused="true">
		<span>
			<h3>Verify Your Age</h3>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span class="close" on:click|trusted={closeAgeModal}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
				<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
			  </svg>
			  </span>
		</span>
			<p>
			    This info is used to comply with privacy and data collection laws. Check the Privacy Policy for more info. This will be saved on the server, so we can optimize it, and you should only have to do this once (if you don't clear your cookies). Closing this box will consider you over 18, unless once you login, we have a saved preferance.
			</p><br>
			<input type="checkbox" name="under-13" id="under-13" on:click={click13}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label for="under-13" on:click={click13}>I am over the age of 13</label><br>
			<input type="checkbox" name="under-18" id="under-18" on:click={click18}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label for="under-18" on:click={click18}>I am over the age of 18</label><br><br>
			<button>Submit</button>
			<button>Skip until login</button>
			<span>&#10;</span>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
	div.age-check {
		width:clamp(240px, 60%, 85em);
		height:clamp(120px, 60%, 85em);
		position: absolute;
		top:50%;
		left:50%;
		margin-right:-50%;
		transform:translate(-50%,-50%);
		z-index:999999999999;
		box-shadow: 4px 4px 12px rgba(20,20,20,.7);
		
		overflow:auto;
		background:white;
		color:black;

	}
	div.age-check *:not(span.close):not(input[type=checkbox]):not(button) {
		margin-left:2em;
		margin-right: 2em;
	}
	div.age-check input[type=checkbox] {
		margin-left:2em;
		margin-right:-1.25em;
	}
	div.age-check span.close {
		transition:.25s ease-in-out;
		float:right;
		position:absolute;
		top:10%;
		margin-right: clamp(125px, auto, 2em);
		font-size:2em;
		color:darkgray;
		display:block;
		right:3%;
		cursor:pointer;
	}
	div.age-check h3 {
		font-size:1.5em;
		margin-bottom:.1em;
	}
	div.age-check span.close:hover {
		font-size:2.2em;
		right:4%;
		color:black;
	}
	div.age-check button {
		background:white;
		box-shadow:4px 4px 12px rgba(20,20,20,.7);
		padding:12px 24px 12px 24px;
		border:none; 
		margin-left:2em; 
		margin-right:-1em;
	}
	div.age-check button:hover {
		cursor:pointer;
		transition: box-shadow .3s ease-in-out;
		box-shadow:8px 8px 16px rgba(40,40,40,.8);
	}
	
</style>
