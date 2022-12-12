<script>
    import GoogleSignInButton from "$lib/googleSignInButton.svelte";
    import SignOutButton from "$lib/SignOutButton.svelte";
    //import AnonymousSignInButton from "$lib/AnonymousSignInButton.svelte";
    export const prerender = false;
</script>
<svelte:head>
    <title>Login</title>
</svelte:head>
<h1>
    Sign In<br>
    <GoogleSignInButton />
    <!--<AnonymousSignInButton /> -->
    <br><small>-or-</small><br>
    <SignOutButton />
</h1>

