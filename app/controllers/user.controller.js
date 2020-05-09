const User = require("../models/user.js");
const Task = require("../models/task.js");

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
            if(data) {
                //user is a admin so he can see the projects
                User.fetchAllUsersWithProject((err,data) =>{
                    if (err) {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the User."
                        });
                    } else {
                        console.log("output: ", JSON.stringify(data));
                        res.send(data);
                    }
                });
            } else {
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

exports.deleteUser = (req,res) => {

    if(!req.params){
        res.status(400).send({
            message: "User email_id can not be empty!"
        });
    }

    if(!req.query){
        res.status(400).send({
            message: "admin email_id can not be empty!"
        });
    }

    //if user is admin or not
    User.checkIfAdmin(req.query.admin_email, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Admin not found with id ${req.query.admin_email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Admin with id " + req.query.admin_email
                });
            }
            // console.log("email from params: ",JSON.stringify(req.query));
        } else{
            if(data) {
                //1. remove tasks 2. remove user
                Task.delete(req.params.emailId,(err,data) =>{
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: `Not found Task for user with id ${req.params.emailId}.`
                            });
                        } else {
                            res.status(500).send({
                                message: "Could not delete Task for user with id " + req.params.emailId
                            });
                        }
                    } else{
                        User.remove(req.params.emailId,(err,data) => {
                            if (err) {
                                if (err.kind === "not_found") {
                                    res.status(404).send({
                                        message: `Not found User with id ${req.params.emailId}.`
                                    });
                                } else {
                                    res.status(500).send({
                                        message: "Could not delete User with id " + req.params.emailId
                                    });
                                }
                            } else res.send({ message: `User was deleted successfully!` });
                        })
                    }
                });
            } else {
                res.status(203).send({
                    message: "Unauthorized access for user_id "+  req.query.email
                });
            }
        }
    });
};