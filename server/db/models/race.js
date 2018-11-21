const Sequelize = require('sequelize')
const db = require('../db')

const Race = db.define('race', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Race'
  },
  length: {
    type: Sequelize.ENUM('day', 'week'),
    defaultValue: 'day'
  },
  completedStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  hasStarted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  startTime: {
    type: Sequelize.DATE
  }
})

module.exports = Race
