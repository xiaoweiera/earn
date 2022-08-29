import { config } from "src/router/config";
import { Router as ExpressRouter } from "express";
import * as earn from "src/controller/earn";
import * as home from "src/controller/home";
const Router = function () {
    const router = ExpressRouter();
    router.get("/", earn.home); // home.begin
    router.get(config.earn, earn.home);
    router.get(config.follow, earn.home);
    return router;
};
export default Router;
