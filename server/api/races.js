const router = require('express').Router()
const {Race} = require('../db/models')
// const {isAdmin} = require('./apiProtection/isAdmin')
const {isAuthenticated} = require('./apiProtection/isAuthenticated')
module.exports = router

// GET all races
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const races = await Race.findAll()
    res.json(races)
  } catch (err) {
    next(err)
  }
})

// GET info of a single race
router.get('/:raceId', isAuthenticated, async (req, res, next) => {
  try {
    const raceId = req.params.raceId
    const race = await Race.findById(raceId)
    res.json(race)
  } catch (err) {
    next(err)
  }
})

// POST a new race
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const newRaceBody = req.body
    const newRace = await Race.create(newRaceBody)
    res.status(201).json(newRace)
  } catch (err) {
    next(err)
  }
})

// PUT race info of a race - name or completedStatus (more likely)
router.put('/:raceId', isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.raceId
    const updatedRaceInfo = req.body
    const newRace = await Race.update(updatedRaceInfo, {
      where: {id},
      returning: true,
      plain: true
    })
    res.status(201).json(newRace)
  } catch (err) {
    next(err)
  }
})
