import { config } from "src/router/config";
import { Router as ExpressRouter } from "express";

const Router = function () {
  const router = ExpressRouter();
  //feed
  router.get(config.freemintLive, function (req, res) {
    res.locals.menuActive = "freeMintLive";
    res.send({});
  });
  router.get(config.freemintTop, function (req, res) {
    res.locals.menuActive = "freeMintTop";
    res.send({});
  });

  //tool
  router.get(config.freemintNFT, function (req, res) {
    res.locals.menuActive = "freeMintNFT";
    res.send({});
  });
  router.get(config.freemintBlock, function (req, res) {
    res.locals.menuActive = "freeMintBlock";
    res.send({});
  });
  router.get(config.freemintAddress, function (req, res) {
    res.locals.menuActive = "freeMintAddress";
    res.send({});
  });
  router.get(config.freemintTimer, function (req, res) {
    res.locals.menuActive = "freeMintTimere";
    res.send({});
  });
  return router;
};
export default Router;
