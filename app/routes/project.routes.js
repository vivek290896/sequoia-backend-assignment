module.exports = app => {
    const projects = require("../controllers/project.controller.js");

    //create new project
    app.post("/project", projects.create);

};