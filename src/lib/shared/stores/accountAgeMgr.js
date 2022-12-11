import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultValue = "18";
const initalValue = browser ? window.localStorage.getItem("age-type") ?? defaultValue : defaultValue;
const status = writable(initalValue);
status.subscribe((value)=>{
    if (browser) {
        window.localStorage.setItem("age-type", value);
    };
});
export default status;