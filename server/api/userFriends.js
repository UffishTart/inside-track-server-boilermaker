const router = require('express').Router()
const {User, UserFriend} = require('../db/models')
const {isAuthenticated} = require('./apiProtection/isAuthenticated')
module.exports = router

router.get('/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const friends = await UserFriend.findAll({
      where: {
        userId: req.params.userId
      }
    })
    if (friends.length) {
      res.json(friends)
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
