const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin} = require('./apiProtection/isAdmin')
const {isAuthenticated} = require('./apiProtection/isAuthenticated')

module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'email',
        'facebookId',
        'losses',
        'wins',
        'estimatedAverage'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(404).send('User is not found!')
    } else {
      res.json(user)
    }
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(404).send('User is not found!')
    } else {
      await user.update(req.body)
      res.json(user)
    }
  } catch (err) {
    next(err)
  }
})
