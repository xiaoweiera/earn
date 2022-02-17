/**
 * @file home
 */

import {config as router} from "~/router/config";

const routes = [
    {
        path: router.home,
        // @ts-ignore
        component: () => import("src/pages/home/index.vue")
    },
    {
        path: `${router.home}/detail`,
        component: () => import("src/pages/home/detail.vue")
    },
];

export default routes;
