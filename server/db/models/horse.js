const Sequelize = require('sequelize')
const db = require('../db')

const Horse = db.define('horse', {
  name: {
    type: Sequelize.STRING
  },
  imgUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Horse
