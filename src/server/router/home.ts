
import {Env} from "src/config";
import {config} from "src/router/config";
import { Router as ExpressRouter } from "express";
import * as home from "src/controller/home";

const Router = async function (root: string, env: Env) {
    const router = ExpressRouter();
    router.get('/', home.begin); //home.begin
    router.get(`${config.homeDetail}`, home.detail);
    return router;
}

export default Router;
