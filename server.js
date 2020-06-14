const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// enable when we need to drop existing table and re sync
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node js online survey application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/userservey.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
