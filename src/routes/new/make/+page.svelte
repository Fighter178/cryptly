<svelte:head>
    <title>New Webpage</title>
</svelte:head>
<script>
    let x = 0; let y=0;
    let elements = [
        {
            title:"Embed", 
            icon:{
                src:"",
                alt:"No Icon"
            }
        },
        {
            title:"Text",
            icon:{
                src:"",
                alt:"No Icon"
            }
        },
    ]
    /**
     * 
     * @param {*} e
     */
    function drop(e){
        const data = e.dataTransfer.getData("id")
        const element = document.getElementById(data)
        let node = element?.cloneNode(true);
        let id = `clone-${Math.floor(Math.random()*9999999999999999999)}`;
        // @ts-ignore
        node.id = id;
        // @ts-ignore
        node?.setAttribute("style", `position:absolute; left:${x}px;top:${y}px;`)
        e.target.appendChild(node);
        handleMovedDraggables();
    }
    /**
     * 
     * @param {*} e
     */
    function dragstartHandler(e){
        e.dataTransfer.dropEffect = "copy";
        e.dataTransfer.setData("id", e.target.id);
    }
    /**
     * @param {*} e
    */
    function mouseMove(e){
        x = e.clientX;
        y = e.clientY;
    }
    /**
     * 
     * @param {*} e
     */
    function touchMove(e){
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    }
    /**
	 * @param {*} e
	 */
    function removeParent(e){
        if (!e) e = window.event;
        e.target.closest("div.draggableElement")?.remove();
    }
    function handleMovedDraggables(){
        document.querySelectorAll(".draggableElement").forEach(elem => {
            elem.addEventListener("click", removeParent);
        })
    }
</script>
<svelte:window on:mousemove={mouseMove} on:touchmove={touchMove} on:load={handleMovedDraggables}></svelte:window>
<main>
    <h3>This is drag & drop mode. Click <a href="/new/make/text">this</a> link to go to text editor mode.</h3>
    <h4>This page is in Beta, v1.0.2</h4>
    <div class="new">
        <div class="preview" on:dragover|preventDefault={mouseMove} on:drop|preventDefault={drop}></div>
        <div class="elementList">
            {#each elements as element, index}
                <div class="draggableElement" draggable="true" id="draggable-{index.toString()}" on:dragstart={dragstartHandler}>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <p class="remove"><b><i class="fa-solid fa-x"></i></b></p>
                    <img src="{element.icon.src}" alt="{element.icon.alt}" draggable="false">
                    <center><p>{element.title}</p></center>
                </div><br>
            {/each}
        </div>
        <div class="view-contorl">
            <button title="Preview"><i class="fa-solid fa-magnifying-glass"></i></button>
            <button title="Save"><i class="fa-solid fa-floppy-disk"></i></button>
            <button title="Launch!"><i class="fa-solid fa-rocket"></i></button>
            <button title="Share"><i class="fa-solid fa-share"></i></button>
            <button title="Settings"><i class="fa-solid fa-gear"></i></button>
        </div>
    </div>
</main>
<style>
    div.new div.elementList div.draggableElement p.remove {
        float:right;
        position: relative;
        margin:none;
        top:-20px;
        bottom:100%;
        font-size:.75em;
        right:-5px;
        color:gray;
        font-weight:700;
    }
    div.new div.elementList div.draggableElement p.remove:hover {
        cursor:not-allowed;
    }
    div.new div.preview div.draggableElement p.remove {
        float:right;
        position: relative;
        margin:none;
        top:-20px;
        bottom:100%;
        font-size:.75em;
        right:-5px;
        color:black;
        font-weight:700;
    }
    div.new div.preview div.draggableElement p.remove:hover {
        cursor:pointer;
    }
    div.elementList {
        display:flex;
        flex-wrap: wrap;
        flex-direction:column;
        flex-flow: column;
        flex-shrink: inherit;
        gap:0.5em;
    }
    div.new {
        display:grid;
        grid-template-columns: repeat(2, max-content);
        gap:0.15em;
    }
    div.preview {
        width:65vw;
        height:75vh;
        background:white;
        border-radius: 0.25em;
    }
    div.draggableElement {
        float:left;
        margin-left:.75em;
        align-self:right;
        background:white;
        padding:1em;
        padding-bottom: 0.125em;
        aspect-ratio: 1/1.25;
        border-radius:0.25em;
        float:right;
        width:65px;
        margin-bottom: 0.5em;
        box-shadow: 0.05em .05em 0.25em rgb(50,50,50);
        transition: all 250ms ease-in-out;
        grid-row:auto;
        grid-column:wrap;
        max-height: 5em;
        
    }
    div.draggableElement:hover {
        box-shadow:.25em .25em .3em rgb(70,70,70);
        margin-left:1em;
        cursor:grab;
    }

    div.view-contorl button {
        background:transparent;
        margin:0.125em;
        border:1px solid lightgray;
        border-radius:0.25em;
        width:2.5em;
        height:2.5em;
        transition: all 150ms ease-in-out;
        aspect-ratio: 1/1;
    }
    div.view-contorl button:hover {
        box-shadow: 0.1em 0.1em 0.1em gray;
        margin:0.225em;
        width:3em;
        height:3em;
        cursor:pointer;
    }
</style>
