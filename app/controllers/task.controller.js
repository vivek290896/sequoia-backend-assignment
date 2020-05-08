// import {validationResult} from "express-validator";

// import {validationResult} from "express-validator";

const Task = require("../models/task.js");

// const { body } = require('express-validator/check')

// exports.validate = (method) =>{
//     switch (method) {
//         case 'newTask': {
//             return[
//                 body("title","task title doesn't exists").exists(),
//                 body("status","status doesn't exists").exists().isIn(['Backlog', 'InProgress', 'Done']),
//                 body("project_id","project id cannot be empty").exists().isInt(),
//                 body("due_date","due_date cannot be empty").exists(),
//                 body("description","description cannot be empty").exists(),
//                 body("assignee_id","assignee_id cannot be empty").exists().isEmail(),
//                 body("assigner_id","assigner_id cannot be empty").exists().isEmail()
//             ]
//         }
//     }
// }

exports.create = (req,res) =>{

    // const errors = validationResult(req);

    if (!req.body) {
        res.status(400).send({
            message: "Task content can not be empty!"
        });
    }

    const task = new Task({
        title : req.body.title,
        status: req.body.status,
        description : req.body.description,
        due_date : req.body.due_date,
        project_id : req.body.project_id,
        assignee_email : req.body.assignee_email,
        assigner_email : req.body.assigner_email
    });

    Task.create(task, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a task."
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Task.updateById(
        req.params.taskId,
        new Task(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Task with id ${req.params.taskId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Task with id " + req.params.taskId
                    });
                }
            } else res.send(data);
        }
    );
};
