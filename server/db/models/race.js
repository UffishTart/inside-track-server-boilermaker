const Sequelize = require('sequelize')
const db = require('../db')

const Race = db.define('race', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Race'
  },
  length: {
    type: Sequelize.INTEGER,
    defaultValue: 1
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
