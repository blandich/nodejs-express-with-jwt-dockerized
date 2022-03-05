module.exports = (sequelize, Sequelize) => {
    const Sprint = sequelize.define("sprints", {
      title: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY
      }
    });
    return Sprint;
};
