
import {Env} from "src/config";
import {config} from "src/router/config";
import { Router as ExpressRouter } from "express";
import * as home from "src/controller/home";

const Router = async function (root: string, env: Env) {
    const router = ExpressRouter();
    router.get(config.home, home.begin);
    router.get(`${config.home}/detail`, function (req, res){
        res.send({});
    });
    return router;
}

export default Router;
