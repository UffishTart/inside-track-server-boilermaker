const Sequelize = require('sequelize')
const db = require('../db')

const UserRace = db.define('userRace', {
  isOwner: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  acceptedInvitation: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  place: {
    type: Sequelize.INTEGER
  },
  differenceFromAverage: {
    type: Sequelize.INTEGER
  },
  percentImprovement: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = UserRace
