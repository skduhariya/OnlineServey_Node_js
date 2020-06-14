module.exports = (app) => {
  const question = require("../controllers/question.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", question.create);

  // insert Answer with questionId
  router.post("/:id/answer", question.insertAnswer);

  // Get all questions with ans
  router.get("/", question.getAllQuestions);

  app.use("/api/question", router);
};
