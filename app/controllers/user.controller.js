const User = require("../models/user.js");

exports.create = (req,res) =>{

    if (!req.body) {
        res.status(400).send({
            message: "User content can not be empty!"
        });
    }

    const user = new User({
        email: req.body.email,
        type: req.body.type,
        name: req.body.name,
        password: req.body.password
    });

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

exports.findByEmailId = (req,res) => {
    User.findByEmailId(req.query.email, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User not found with id ${req.query.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.query.email
                });
            }
            console.log("email from params: ",JSON.stringify(req.query));
        } else res.send(data);
    })
};

exports.findUsersInProject = (req,res) =>{
    if(!req.query.email){
        res.status(400).send({
            message: "email_id can not be empty!"
        });
    }
    User.fetchUsersByProject(req.query.email,req.params.projectId, (err, data) =>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Users not found for project_id ${req.params.projectId}.`
                });
            }else if(err === "Access denied for project"){
                res.status(403).send({
                    message: `Access denied for project`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Users for project_id " + req.params.projectId
                });
            }
             console.log("error: ",err);
        } else res.send(data);
    })
};

exports.adminPanel = (req,res) => {
    if(!req.query.email){
        res.status(400).send({
            message: "email_id can not be empty!"
        });
    }

    //if user is admin or not
    User.checkIfAdmin(req.query.email, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User not found with id ${req.query.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.query.email
                });
            }
            console.log("email from params: ",JSON.stringify(req.query));
        } else{
            if(!data) {
                res.status(203).send({
                   message: "Unauthorized access for user_id "+  req.query.email
                });
            }
        }
    });

};

exports.updateUserType = (req,res) => {
    User.updateByEmail(req.params.email,req.query.type, (err,date) =>{
        if (err){

        }
    })
};