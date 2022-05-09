import { config } from "src/router/config";
import { Router as ExpressRouter } from "express";

const Router = function () {
  const router = ExpressRouter();
  router.get(config.instructions, function (req, res) {
    res.send({});
  });
  return router;
};
export default Router;
