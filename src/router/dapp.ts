import {config as router} from "~/router/config";

const routes = [
	{
		path: `${router.dapp}/discover`,
		component: () => import("src/pages/dapp/discover.vue"),
	},
	{
		path: router.nft,
		component: () => import("src/pages/dapp/nft.vue"),
	},
	{
		path: router.airdrop,
		component: () => import("src/pages/dapp/discover.vue"),
	},
];

export default routes;
