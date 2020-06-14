const db = require("../models");

const UserServey = db.userservey;
const Question = db.questions;
const Users = db.users;
const Answer = db.answer;

const Op = db.Sequelize.Op;

exports.insertServey = (req, res) => {
  const question_id = req.body.questionId;
  const answer_id = req.body.answerId;
  const user_id = req.body.userId;

  if (!question_id) {
    res.status(400).send({
      message: "Question Id can not be empty!",
    });
    return;
  }
  if (!answer_id) {
    res.status(400).send({
      message: "Answer Id can not be empty!",
    });
    return;
  }
  if (!user_id) {
    res.status(400).send({
      message: "User Id can not be empty!",
    });
    return;
  }
  const servey = {
    questionId: question_id,
    userId: user_id,
    answerId: answer_id,
  };

  UserServey.create(servey)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while inserting the servey.",
      });
    });
};

exports.getServeyByUser = (req, res) => {
  const id = req.params.id;
  UserServey.findAll({
    include: [
      { model: Users, as: "users" },
      { model: Question, as: "questions", include: ["answers"] },
    ],
    where: {
      userId: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching servey.",
      });
    });
};

exports.getServey = (req, res) => {
    UserServey.findAll({
      include: [
        { model: Users, as: "users" },
        { model: Question, as: "questions", include: ["answers"] },
      ]
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while fetching servey.",
        });
      });
  };
