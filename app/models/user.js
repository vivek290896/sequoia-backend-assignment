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

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

User.checkIfAdmin = (email, result) =>{
    sql.query(`SELECT type FROM users WHERE email = "${email}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("user type: ", res[0].type);
            if(res[0].type === "admin") result(null, true);
            else result(null,false);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

User.fetchUsersByProject = (email_id,project_id, result) =>{
    sql.query(
        `SELECT * FROM users WHERE email IN (SELECT assignee_email FROM tasks WHERE project_id = ?)`,
        [project_id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                let flag = 0;
                for(var i=0;i<res.length;i++){
                    if (res[i].email === email_id){
                        flag = 1;
                    }
                }
                if (flag === 0){
                    result("Access denied for project",null)
                }
                // console.log("found users for project: ", JSON.stringify(res));
                else{
                    result(null, res)
                }
                return;
            }
            result({ kind: "not_found" }, null);
        }
    )
};

User.fetchAllUsersWithProject = result => {
    sql.query(`SELECT U.name, U.email, T.project_id FROM users U, tasks T WHERE (T.assignee_email = U.email)`,
        (err,res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);

            }
            else if (res){
                result(null,res);

            }
            else result({ kind: "not_found" }, null);
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
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with emailId: ", email);
        result(null, res);
    });
};

module.exports = User;

