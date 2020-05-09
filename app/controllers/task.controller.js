const Task = require("../models/task.js");

exports.create = (req,res) =>{


    if (!req.body) {
        res.status(400).send({
            message: "Task content can not be empty!"
        });
    }

    const task = new Task({
        title : req.body.title,
        status: req.body.status,
        description : req.body.description,
        due_date : new Date(req.body.due_date),
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
