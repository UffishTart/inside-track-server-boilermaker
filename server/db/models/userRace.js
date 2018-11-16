const Sequelize = require("sequelize");
const db = require("../db");

const UserRace = db.define("userRace", {
  place: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  differenceFromAverage: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  percentage: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  completedStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = UserRace;
