
import { config as router } from "src/router/config";

const routes = [
    {
        path: router.earn,
        component: () => import("src/pages/earn/index.vue"),
    },
    {
        path: router.follow,
        component: () => import("src/pages/follow/index.vue"),
    }
];

export default routes;
