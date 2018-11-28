const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/races', require('./races'))
router.use('/userRaces', require('./userRaces'))
router.use('/userFriends', require('./userFriends'))
router.use('/horses', require('./horses'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
