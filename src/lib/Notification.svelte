<script>
    export let title = "Notification";
    export let body = "Text";
    export let notificationClass = "notification";
    export let id = "notification-element-id";
    export let onClose = ()=>{};
    /**
	 * @type {string | any[]}
	*/
    export let buttons = [
        {
            text:"Button",
            class:"btn",
            callback:()=>{console.log("Clicked!")}
        }
    ];
    export const close = ()=>{
        // @ts-ignore
        document.querySelector(`div.${notificationClass}`)?.remove();
        onClose();
    };
    const keyboardClose = (/** @type {Event | undefined} */ e)=>{
        if (!e) {e = window.event};
        // @ts-ignore
        if (e.key == "X" || e.key == "x") {
            close();
        };
    };
</script>
<div class="{notificationClass}" id="{id}">
    <div class="topbar">
        <span>{title}</span>
        <span on:click={close} on:keyup|preventDefault|trusted={keyboardClose}>&times;</span>
    </div>
    <div class="content">
        {body}
        {#if buttons.length > 0}
            {#each buttons as button}
                <button on:click={()=>{button.callback}} class="{button.class}">{button.text}</button>
            {/each}
        {/if}
    </div>
</div>
<style>
    .notification {
        transition: box-shadow 200ms ease-in-out;
        position:absolute;
        right:16px;
        bottom:24px;
        width:fit-content;
        height:fit-content;
        padding:12px;
        background:#2e2e2e;
        color:white;
        border:none;
    }
    .notification:hover {
        box-shadow:12px 12px 24px black;
    }
    .notification span {
        cursor:pointer;
    }
</style>