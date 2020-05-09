module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const { userValidationRules, validate } = require('../validators/user.validator.js')
  //create new user
    app.post("/user", userValidationRules(), validate, users.create);

    app.get("/user",users.findByEmailId);

    app.get("/project/:projectId/user", users.findUsersInProject);

    app.get("/panel/admin",users.adminPanel);

    app.delete("/user/:emailId",users.deleteUser);
};