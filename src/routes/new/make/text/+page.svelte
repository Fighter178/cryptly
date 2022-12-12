<svelte:head>
    <title>HTML Editor</title>
    <script src="https://cdn.tiny.cloud/1/zbzy2hye6lp8va1tqtn5x811pwjrldgg7h9z6on6bqwqtzmg/tinymce/6/tinymce.min.js" on:load={tinymceloaded} referrerpolicy="origin"></script>
</svelte:head>
<script>
    export const prerender = false
    let tiny;
    let value = ""
    // @ts-ignore
    $: output = ''
    // @ts-ignore
    let editorChangeHandlerId = ()=>{output = window.tinymce.activeEditor.getContent();};
    const tinymceloaded = ()=>{
        // @ts-ignore
        tiny = window.tinymce.init({
            selector:"textarea",
            branding:false,
            plugins: 'emoticons autosave autolink advcode fullscreen wordcount tinymcespellchecker a11ychecker help searchreplace image preview',
            toolbar:'undo redo| newdocument | copy cut selectall | removeformat blocks fontsize fontfamily forecolor | formatselect | bold italic underline strikethrough | superscript subscript',
            autosave_restore_when_empty: true,
            /**
             * 
             * @param {*} editor
             */
            setup: function(editor) {
                editor.on('Paste Change input Undo Redo', editorChangeHandlerId)
            }
        });
        document.querySelector("progress")?.remove();
    };
</script>
<main>
    <center>
        <progress />
    </center>
<textarea bind:value={value}></textarea>
</main>
<style>
    * {
        scrollbar-color: white white;
    }
</style>