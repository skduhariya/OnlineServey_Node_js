const db = require("../models");
const Question = db.questions;
const Answer = db.answer;
// const Op = db.Sequelize.Op;

// Create and Save a new Question
exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({
      message: "Question can not be empty!",
    });
    return;
  }

  // Create Question
  const question = {
    question: req.body.question,
  };

  // Save Question in the database
  Question.create(question)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question.",
      });
    });
};

// Create and Save a new Question
exports.insertAnswer = (req, res) => {
  // Validate request
  if (!req.body.choice) {
    res.status(400).send({
      message: "choice can not be empty!",
    });
    return;
  }

  // Create Question
  const answer = {
    choice: req.body.choice,
    questionId: req.params.id,
  };

  // Save Question in the database
  Answer.create(answer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Answer.",
      });
    });
};

exports.getAllQuestions = (req, res) => {
  Question.findAll({
    include: ["answers"],
  })
    .then((questions) => {
      res.send(questions);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching Questions.",
      });
    });
};
