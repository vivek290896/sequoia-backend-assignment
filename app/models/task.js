const sql = require("./db.js");

const Task = function (task) {
    this.title = task.title;
    this.status = task.status; //admin, user
    this.description = task.description;
    this.due_date = task.due_date;
    this.project_id = task.project_id;
    this.assignee_email = task.assignee_email;
    this.assigner_email = task.assigner_email;
};

Task.create = (newTask,result) => {
    sql.query("INSERT INTO tasks SET ?",newTask, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created task: ", { id: res.insertId, ...newTask});
        result(null, { id: res.insertId, ...newTask });
    });
};

module.exports = Task;