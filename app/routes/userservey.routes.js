module.exports = (app) => {
  const userServey = require("../controllers/userservey.controller.js");

  var router = require("express").Router();

  router.post("/", userServey.insertServey);
  router.get("/", userServey.getServey);
  router.get("/:id", userServey.getServeyByUser);

  app.use("/api/servey", router);
};
