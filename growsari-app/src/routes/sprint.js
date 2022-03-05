const { authJwt } = require("../middleware");
const controller = require("../domains/sprints/controllers/sprintcontroller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get(
        "/api/sprint/all",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getAllSprints
    );
    app.post(
        "/api/sprint/create",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.addSprint
    );
    app.put(
        "/api/sprint/update/:id",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.updateSprint
    );
    app.delete(
        "/api/sprint/delete/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteSprint
    );
};