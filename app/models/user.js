const sql = require("./db.js");

const User = function (user) {
    this.email = user.email;
    this.type = user.type; //admin, user
    this.name = user.name;
    this.password = user.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findByEmailId = (emailId, result) => {
    sql.query(`SELECT * FROM users WHERE email = "${emailId}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

User.updateByEmail = (email, type, result) => {
    sql.query(
        "UPDATE users SET type = ? WHERE email = ?",
        [type, email],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { email: email, ...user });
            result(null, { email: email, ...user });
        }
    );
};

User.remove = (email, result) => {
    sql.query("DELETE FROM users WHERE email = ?", email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with emailId: ", email);
        result(null, res);
    });
};

module.exports = User;

