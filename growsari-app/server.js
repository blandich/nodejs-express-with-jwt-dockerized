const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./src/common/models");
const { sprint } = require("./src/common/models");
// const user = require("./src/domains/users/models/user");
const User = db.user;
const Sprint = db.sprint;
const Role = db.role;
const Task = db.task;
const Comment = db.comment;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
// simple route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to growsari-node-app-with-jwt application." });
});
// routes
require('./src/routes/auth')(app);
require('./src/routes/trial')(app);
require('./src/routes/sprint')(app);
require('./src/routes/todolist')(app);
require('./src/routes/comment')(app);
require("dotenv").config();
// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
if (process.env.NODE_ENV === 'test') {
  module.exports = app;
}
else {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });

    Sprint.create({
      title: "sample sprint",
      start_date: "2021-10-31",
      end_date: "2022-10-31"
    })
    .then(sprint => {
      Task.create({
        description: "Sample task",
        priority: 1,
        sprintId: sprint.id
      })
        .then(task => {
          Comment.create({
            content: "trial comment in here",
            taskId: task.id
          });
        });
    });
}
