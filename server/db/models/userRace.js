const Sequelize = require('sequelize')
const db = require('../db')

const UserRace = db.define('userRace', {
  place: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  differenceFromAverage: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  percentImprovement: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
})

module.exports = UserRace
