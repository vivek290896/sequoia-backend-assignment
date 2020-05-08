module.exports = app => {
  const users = require("../controllers/user.controller.js");

  //create new user
    app.post("/user", users.create);

    app.get("/user",users.findByEmailId);

    app.get("project/:projectId/user", users.findUsersInProject);
};