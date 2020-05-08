const sql = require("./db.js");

const Project = function (project) {
    this.name = project.name;
};

Project.create = (newProject,result) => {
  sql.query("INSERT INTO projects SET ?",newProject, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created project: ", { id: res.insertId, ...newProject });
        result(null, { id: res.insertId, ...newProject });
    });
};

module.exports = Project;