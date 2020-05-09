module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
    const { taskValidationRules, validate } = require('../validators/task.validator.js')
    //create new task
    app.post("/task",taskValidationRules(),validate, tasks.create);

    app.put("/task/:taskId",taskValidationRules(),validate, tasks.update);

};