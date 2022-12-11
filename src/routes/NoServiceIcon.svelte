<script>
	import { onMount } from "svelte";

    export let size = 1;
    export let sizeUnit="em";
    export let showSlash = true;
    export let animate = true;
    export let color = "red;";
    export let title = "Connection Status";

    onMount(()=>{
        const root = document.documentElement;
        if (!animate) {
            root.style.setProperty("--animation", "noblink 1s infinite;");
        }
        root.style.setProperty("--color", color);
    });
</script>
<span class="fa-stack fa-2x" style="font-size:{size}{sizeUnit}" title="{title}">
    <i class="fas fa-solid fa-wifi fa-stack-1x"></i>
    {#if showSlash}
        <i class="fas fa-slash fa-stack-1x" style="text-shadow: 0.1em 0.15em white;"></i>
    {/if}
</span>
<style>
    :root {
        --animation: blink 1s infinite;
        --color:black
    }
    span {
        display:inline-block;
        position: relative;
        margin-right: 4px;
        right:24px;
        top:-39px;
        margin-top:none;
        animation: var(--animation);
        color: var(--color);
    }
    
    @keyframes blink {
        from {
            opacity:1;
        }
        50% {
            opacity:.5;
        }
        to {
            opacity:1;
        }
    }
    @keyframes noblink {
        0% {
            opacity:1;
        }
        100%  {
            opacity:1;
        }
    }
</style>