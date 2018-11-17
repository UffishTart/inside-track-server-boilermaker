const router = require('express').Router()
const Op = require('sequelize').Op
const {User, Race, UserRace} = require('../db/models')
// const {isAdmin} = require('./apiProtection/isAdmin')
const {isAuthenticated} = require('./apiProtection/isAuthenticated')
module.exports = router

// GET data for all users in all races
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const userRaces = await UserRace.findAll()
    res.json(userRaces)
  } catch (err) {
    next(err)
  }
})

// GET data for all users in a single race
router.get('/:raceId', isAuthenticated, async (req, res, next) => {
  try {
    const {raceId} = req.params
    const race = await Race.findById(raceId)
    if (!race) {
      res.status(404).send('Race is not found!')
    } else {
      const userRaceDataEntries = await UserRace.findAll({where: {raceId}})
      res.json(userRaceDataEntries)
    }
  } catch (err) {
    next(err)
  }
})

// GET data for a single user in a single race
router.get('/:raceId/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const {raceId, userId} = req.params
    const race = await Race.findById(raceId)
    const user = await User.findById(userId)
    if (!race) {
      res.status(404).send('Race is not found!')
    } else if (!user) {
      res.status(404).send('User is not found!')
    } else {
      const userRaceEntry = await UserRace.findAll({
        where: {raceId, userId}
      })
      res.json(userRaceEntry)
    }
  } catch (err) {
    next(err)
  }
})

// POST a user's race data into UserRace model
// takes in userId, raceId, place, differenceFromAverage, percentImprovement
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const userRaceData = req.body
    console.log('!!!!!!!!!!!!!!!!!!!! req body ', req.body)
    const newUserRaceEntry = await UserRace.create(userRaceData)
    res.status(201).json(newUserRaceEntry)
  } catch (err) {
    next(err)
  }
})
