module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("questions", {
    question: {
      type: DataTypes.STRING,
    },
  });

  return Question;
};
