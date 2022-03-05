const { authJwt } = require("../middleware");
const controller = require("../domains/tasks/controllers/taskcontroller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get(
        "/api/todolist/all",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getAllTasks
    );
    app.post(
        "/api/sprint/:sprintId/todolist/create",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.addTask
    );
    app.put(
        "/api/todolist/update/:id",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.updateTask
    );
    app.delete(
        "/api/todolist/delete/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteTask
    );
};