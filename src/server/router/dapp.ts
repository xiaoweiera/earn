import {Env} from "src/config";
import {config} from "src/router/config";
import { Router as ExpressRouter } from "express";

const Router = async function (root: string, env: Env) {
    const router = ExpressRouter();
    router.get(config.dappList, function (req, res){
        res.send({});
    });

    router.get(config.nft, function (req, res){
        res.send({});
    });

    return router;
}
console.log(Router);
export default Router;