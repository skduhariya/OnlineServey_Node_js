const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.questions = require("./questions.model")(sequelize, Sequelize);
db.answer = require("./answer.model")(sequelize, Sequelize);
db.userservey = require("./user_servey.model")(sequelize, Sequelize);

db.questions.hasMany(db.answer, { as: "answers" });
db.answer.belongsTo(db.questions, {
  foreignKey: "questionId",
  as: "questions",
});

db.users.hasMany(db.userservey, {as: "users"});
db.userservey.belongsTo(db.users, {
    foreignKey:"userId",
    as:"users"
});

db.questions.hasMany(db.userservey, { as: "questions" });
db.userservey.belongsTo(db.questions, {
  foreignKey: "questionId",
  as: "questions",
});

db.answer.hasMany(db.userservey, { as: "answers" });
db.userservey.belongsTo(db.answer, {
  foreignKey: "answerId",
  as: "answer",
});


module.exports = db;
