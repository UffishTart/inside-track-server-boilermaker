const router = require('express').Router()
const {Horse} = require('../db/models')

module.exports = router
router.get('/', async (req, res, next) => {
  try {
    const horses = await Horse.findAll()
    res.json(horses)
  } catch (err) {
    next(err)
  }
})
