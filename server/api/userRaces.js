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
      const userIds = userRaceDataEntries.map(entry => entry.userId)
      const users = await User.findAll({
        where: {id: {[Op.in]: userIds}}
      })
      const userMap = {}
      users.forEach(user => {
        userMap[user.dataValues.id] = user.dataValues
      })
      const entriesWithData = userRaceDataEntries.map(entry => {
        const userId = entry.dataValues.userId
        entry.dataValues.userInfo = userMap[userId]
        entry.dataValues.raceInfo = race
        return entry
      })
      // GETS the entries where the users have accepted/not accepted the invite
      if (req.query.acceptedInvitation) {
        const filteredEntriesWithData = entriesWithData.filter(entry => {
          return (
            req.query.acceptedInvitation === String(entry.acceptedInvitation)
          )
        })
        res.json(filteredEntriesWithData)
      } else {
        res.json(entriesWithData)
      }
    }
  } catch (err) {
    next(err)
  }
})

// GET data for all races for a single user
router.get('/races/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const {userId} = req.params
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).send('User is not found!')
    } else {
      const userRaceDataEntries = await UserRace.findAll({where: {userId}})
      const raceIds = userRaceDataEntries.map(entry => entry.raceId)
      const races = await Race.findAll({
        where: {id: {[Op.in]: raceIds}}
      })
      const raceMap = {}
      races.forEach(race => {
        raceMap[race.dataValues.id] = race.dataValues
      })
      const entriesWithData = userRaceDataEntries.map(entry => {
        const raceId = entry.dataValues.raceId
        entry.dataValues.raceInfo = raceMap[raceId]
        entry.dataValues.userInfo = user
        return entry
      })
      // GETS the entries where the users have accepted/not accepted the invite
      if (req.query.acceptedInvitation) {
        const filteredEntriesWithData = entriesWithData.filter(entry => {
          return (
            req.query.acceptedInvitation === String(entry.acceptedInvitation)
          )
        })
        res.json(filteredEntriesWithData)
      } else if (req.query.hasStarted) {
        const filteredEntriesWithData = entriesWithData.filter(entry => {
          return req.query.hastStarted === String(entry.raceInfo.hasStarted)
        })
        res.json(filteredEntriesWithData)
      } else {
        res.json(entriesWithData)
      }
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
      const userRaceDataEntry = await UserRace.findAll({
        where: {raceId, userId}
      })

      const entryWithData = userRaceDataEntry.map(entry => {
        entry.dataValues.raceInfo = race
        entry.dataValues.userInfo = user
        return entry
      })

      res.json(entryWithData)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:raceId/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const userRace = await UserRace.findOne({
      where: {
        userId: req.params.userId,
        raceId: req.params.raceId
      }
    })
    if (userRace.userId) {
      await userRace.update(req.body)
      res.send(userRace)
    } else {
      res.status(404).send('Not Found')
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
    const newUserRaceEntry = await UserRace.create(userRaceData)

    console.log(newUserRaceEntry)
    const race = await Race.findById(newUserRaceEntry.raceId)
    const user = await User.findById(newUserRaceEntry.userId)

    const entryWithData = [newUserRaceEntry].map(entry => {
      entry.dataValues.raceInfo = race
      entry.dataValues.userInfo = user
      return entry
    })
    res.status(201).json(entryWithData)
  } catch (err) {
    next(err)
  }
})
