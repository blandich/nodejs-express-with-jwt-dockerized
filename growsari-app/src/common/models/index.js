const config = require("../../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.port,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../../domains/users/models/user.js")(sequelize, Sequelize);
db.role = require("../../domains/roles/models/role.js")(sequelize, Sequelize);
db.sprint = require("../../domains/sprints/models/sprint.js")(sequelize, Sequelize);
db.task = require("../../domains/tasks/models/task.js")(sequelize, Sequelize);
db.comment = require("../../domains/comments/models/comment.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.user.hasMany(db.sprint, {as: "sprints"});
db.sprint.belongsTo(db.user);
db.sprint.hasMany(db.task, {
  as: "tasks",
  onDelete: "CASCADE"
});
db.task.belongsTo(db.sprint);
db.task.hasMany(db.comment, {
  as: "comments",
  onDelete: "CASCADE"
});
db.comment.belongsTo(db.task);
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;