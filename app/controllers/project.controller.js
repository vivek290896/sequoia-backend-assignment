const Project = require("../models/project.js");

exports.create = (req,res) =>{

    if (!req.body) {
        res.status(400).send({
            message: "Project content can not be empty!"
        });
    }

    const project = new Project({
        name: req.body.name
    });

    Project.create(project, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Project."
            });
        else res.send(data);
    });
};
