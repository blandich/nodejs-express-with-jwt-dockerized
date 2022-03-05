const { authJwt } = require("../middleware");
const controller = require("../domains/comments/controllers/commentcontroller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get(
        "/api/comment/all",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getAllComments
    );
    app.post(
        "/api/todolist/:taskId/comment/create",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.addComment
    );
    app.put(
        "/api/comment/update/:id",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.updateComment
    );
    app.delete(
        "/api/comment/delete/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteComment
    );
};