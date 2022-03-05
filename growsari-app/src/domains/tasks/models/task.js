module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      description: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.INTEGER
      }
    });
    return Task;
};
