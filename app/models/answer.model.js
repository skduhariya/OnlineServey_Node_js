module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define("answer", {
    choice: {
      type: DataTypes.STRING,
    },
  });

  return Answer;
};
