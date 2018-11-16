const Sequelize = require('sequelize')
const db = require('../db')

const Race = db.define('race', {
  length: {
    type: Sequelize.ENUM('day', 'week'),
    defaultValue: 'day'
  }
})

module.exports = Race
