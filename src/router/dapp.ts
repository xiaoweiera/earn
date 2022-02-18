import {config as router} from "src/router/config";

const routes = [
	{
		path: `${router.dapp}/discover`,
		component: () => import("src/pages/dapp/discover.vue"),
	},
	{
		path: `${router.nft}/discover`,
		component: () => import("src/pages/dapp/nft.vue"),
	},
	{
		path: `${router.dapp}/discover`,
		component: () => import("src/pages/dapp/discover.vue"),
	},
	{
		path: router.airdrop,
		component: () => import("src/pages/dapp/discover.vue"),
	},
];

export default routes;
