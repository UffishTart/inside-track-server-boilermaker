const isAdmin = (req, res, next) => {
    if (req.user) {
      if (req.user.isAdmin) next();
      else res.status(401).send("Access Denied!");
    } else {
      res.status(401).send("Access Denied!");
    }
  };
  module.exports = { isAdmin };
  