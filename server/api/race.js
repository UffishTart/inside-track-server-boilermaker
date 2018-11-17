const router = require('express').Router()
const {User, Race, UserRace} = require('../db/models')
const {isAdmin} = require('./apiProtection/isAdmin')
const {isAuthenticated} = require('./apiProtection/isAuthenticated')
module.exports = router

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const races = Race.findAll()
    res.json(races)
  } catch (err) {
    next(err)
  }
})
router.get('/:raceId', isAuthenticated, async (req, res, next) => {
  try {
    const raceId = req.params.raceId
    const race = Race.findById(raceId)
    if (!race) {
      res.status(404).send('Race is not found!')
    } else {
      const userRaceData = UserRace.findAll({where: {raceId}})
      const userIds = userRaceData.map(el => el.userId)
      const users = User.findAll({
        where: {id: {[Op.in]: userIds}}
      })
      const raceMap = {}
      users.forEach(user => {
        raceMap[user.dataValues.id] = race.dataValues
      })
    }
  } catch (err) {
    next(err)
  }
})
