import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultValue = undefined;
const initalValue = browser ? window.localStorage.getItem("session-status") ?? defaultValue : defaultValue;
const userData = writable(initalValue);
userData.subscribe((value)=>{
    if (browser) {
        window.localStorage.setItem("user-data", value);
    };
});
export default userData;