<script>
	import { onMount } from "svelte";


    /**
     * @type {Number} Percent to show the icon on. 
     */
    export let showOn = 25;
    let shown = false;
    onMount(()=>{
        if (navigator.userAgent.toLocaleLowerCase().includes("firefox")) {
            console.warn("Cannot access Battery API due to client being Firefox. Battery saving mode will be disabled.");
            return;
        }
        // @ts-ignore
        navigator.getBattery().then(battery => {
            
            if (battery.level*100 <= showOn) {
                shown = true;
            } else {shown = false;}
            battery.addEventListener("levelchange", ()=>{
                // @ts-ignore
                if (battery.level <= showOn) {
                    shown = true;
                } else {shown = false}
            })
        })
    })
</script>
{#if shown}
<span><i class="fa-solid fa-battery-quarter"></i></span>
{/if}
<style>
    i {
        animation:blink 1s infinite;
        display:inline-block;
        position: relative;
        top:-63px;
        right:24px;
        margin-top:none;
    }
    @keyframes blink {
        from {
            opacity:.5;
        }
        50% {
            opacity:1;
        }
        to {
            opacity:.5;
        }
    }
</style>