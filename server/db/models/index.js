const User = require('./user')
const Race = require('./race')
const UserRace = require('./userRace')
const UserFriend = require('./userFriend')
const Horse = require('./horse')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.belongsToMany(User, {as: 'friend', through: UserFriend})

User.belongsToMany(Race, {through: UserRace})
Race.belongsToMany(User, {through: UserRace})

Horse.hasMany(User)
User.belongsTo(Horse)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Race,
  UserRace,
  UserFriend,
  Horse
}
