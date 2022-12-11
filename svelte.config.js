import preprocess from "svelte-preprocess";
import vercel from "@sveltejs/adapter-vercel"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: vercel(),
		target:"#svelte"
	},
	preprocess: [
		preprocess({
			scss:{
				prependData:`@import './src/scss/styles.scss';`
			},
			postcss:true,
		}),
	],
};

export default config;
