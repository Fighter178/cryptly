import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultValue = "true";
const initalValue = browser ? window.localStorage.getItem("session-status") ?? defaultValue : defaultValue;
const sessionStatus = writable(initalValue);
sessionStatus.subscribe((value)=>{
    if (browser) {
        window.localStorage.setItem("session-status", value);
    };
});
export default sessionStatus;