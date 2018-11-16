const isAuthenticated = (req, res, next) => {
  if (
    Number(req.user.dataValues.id) === Number(req.params.id) ||
    req.user.isAdmin
  ) {
    next()
  } else {
    res.status(401).send('Access Denied!')
  }
}
module.exports = {
  isAuthenticated
}
