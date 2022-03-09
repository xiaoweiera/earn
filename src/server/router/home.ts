
import {config} from "src/router/config";
import * as home from "src/controller/home";
import { Router as ExpressRouter } from "express";

const Router = function () {
    const router = ExpressRouter();
    router.get('/', home.begin); //home.begin
    router.get(`${config.homeDetail}`, home.detail);
    return router;
}

export default Router;
