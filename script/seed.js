const {User, Race, UserRace, UserFriend} = require('../server/db/models')
const db = require('../server/db')
const {green, red} = require('chalk')

const userFriendRelations = [
  {
    userId: 1,
    friendId: 4
  },
  {
    userId: 1,
    friendId: 3
  },
  {
    userId: 2,
    friendId: 3
  },
  {
    userId: 4,
    friendId: 2
  },
  {
    userId: 3,
    friendId: 4
  }
]

const raceData = [
  {
    length: 'day'
  },
  {
    length: 'day'
  },
  {
    length: 'day'
  },
  {
    length: 'day'
  },
  {
    length: 'day'
  }
]
const userRaceRelations = [
  {
    userId: 1,
    raceId: 1,
    place: 2,
    differenceFromAverage: 100,
    percentage: 0.1,
    completedStatus: true
  },
  {
    userId: 2,
    raceId: 1,
    place: 1,
    differenceFromAverage: 1000,
    percentage: 0.2,
    completedStatus: true
  }
]

const seed = async () => {
  await db.sync({force: true})
  const users = await Promise.all([
    User.create({
      userName: 'rui',
      email: 'rui@email.com',
      password: '123',
      isAdmin: true,
      wins: 4,
      losses: 3,
      estimatedAverage: 2514
    }),
    User.create({
      userName: 'kwhicher1',
      email: 'bradke1@discovery.com',
      password: 'w5jOkrnlwo',
      wins: 2,
      losses: 2,
      estimatedAverage: 42565
    }),
    User.create({
      userName: 'carthurs2',
      email: 'grobinett2@xing.com',
      password: 'SSIuIMXI',
      wins: 1,
      losses: 3,
      estimatedAverage: 33900
    }),
    User.create({
      userName: 'bbroadnicke3',
      email: 'dboseley3@apple.com',
      password: 'CiE0CKUGxU',
      wins: 9,
      losses: 7,
      estimatedAverage: 93332
    }),
    User.create({
      userName: 'nblincoe4',
      email: 'ehellwich4@bluehost.com',
      password: 'OlojN9868',
      wins: 4,
      losses: 3,
      estimatedAverage: 93088
    })
  ])
  await UserFriend.bulkCreate(userFriendRelations)
  await Race.bulkCreate(raceData)
  await UserRace.bulkCreate(userRaceRelations)

  console.log(green('Seeding success!'))
  db.close()
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
