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

exports.updateUserType = (req,res) => {
    User.updateByEmail(req.params.email,req.query.type, (err,date) =>{
        if (err){

        }
    })
};