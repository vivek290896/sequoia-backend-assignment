const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(expressValidator);

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to trello application." });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/project.routes.js")(app);
require("./app/routes/task.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
