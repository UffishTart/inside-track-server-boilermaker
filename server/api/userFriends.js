const router = require('express').Router()
const Op = require('sequelize').Op
const {User, UserFriend} = require('../db/models')
const {isAuthenticated} = require('./apiProtection/isAuthenticated')
module.exports = router

router.get('/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const friendEntries = await UserFriend.findAll({
      where: {
        userId: req.params.userId
      }
    })
    if (friendEntries.length) {
      const friendIds = friendEntries.map(entry => entry.friendId)
      const friendsAsUser = await User.findAll({
        where: {id: {[Op.in]: friendIds}}
      })
      const friendMap = {}
      friendsAsUser.forEach(friend => {
        friendMap[friend.dataValues.id] = friend.dataValues
      })
      const entriesWithData = friendEntries.map(entry => {
        const friendId = entry.dataValues.friendId
        entry.dataValues.friendInfo = friendMap[friendId]
        return entry
      })
      res.json(entriesWithData)
    } else {
      res.status(404).send('Not Found')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const newRelation = await UserFriend.create({
      userId: req.body.userId,
      friendId: req.body.friendId
    })
    res.send(newRelation)
  } catch (err) {
    next(err)
  }
})
