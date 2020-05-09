module.exports = app => {
    const projects = require("../controllers/project.controller.js");
    const { projectValidationRules, validate } = require('../validators/project.validator.js')
    //create new project
    app.post("/project",projectValidationRules(),validate, projects.create);

};