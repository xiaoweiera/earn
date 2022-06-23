import { config } from "src/router/config";
import { Router as ExpressRouter } from "express";
import * as freeMint from "src/controller/freemint";

const Router = function () {
  const router = ExpressRouter();
  //feed
  router.get(config.freemintLive, freeMint.toolNft);
  router.get(config.freemintTop, function (req, res) {
    res.send({});
  });

  //tool
  router.get(config.freemintNFT, function (req, res) {
    res.locals.menuActive = "freeMint";
    res.send({});
  });
  router.get(config.freemintBlock, function (req, res) {
    res.send({});
  });
  router.get(config.freemintAddress, function (req, res) {
    res.send({});
  });
  router.get(config.freemintTimer, function (req, res) {
    res.send({});
  });
  return router;
};
export default Router;
