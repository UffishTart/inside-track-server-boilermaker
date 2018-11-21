'use strict'

const {User, Race, UserRace, UserFriend} = require('../server/db/models')
const db = require('../server/db')

const fiveDaysAgo = new Date()
const tenDaysAgo = new Date()
const end = new Date()
fiveDaysAgo.setDate(end.getDate() - 5)
tenDaysAgo.setDate(end.getDate() - 10)

const userFriendData = [
  {
    userId: 1,
    friendId: 3
  },
  {
    userId: 1,
    friendId: 4
  },
  {
    userId: 2,
    friendId: 3
  },
  {
    userId: 2,
    friendId: 4
  },
  {
    userId: 3,
    friendId: 4
  },
  {
    userId: 4,
    friendId: 5
  },
  {
    userId: 3,
    friendId: 1
  },
  {
    userId: 4,
    friendId: 1
  },
  {
    userId: 3,
    friendId: 2
  },
  {
    userId: 4,
    friendId: 2
  },
  {
    userId: 4,
    friendId: 3
  },
  {
    userId: 5,
    friendId: 4
  }
]

const raceData = [
  {
    name: 'first race',
    length: 'day',
    completedStatus: true,
    hasStarted: true,
    startTime: fiveDaysAgo
  },
  {
    name: 'second race',
    length: 'day',
    completedStatus: true,
    hasStarted: true,
    startTime: fiveDaysAgo
  },
  {
    name: 'third race',
    length: 'day',
    completedStatus: false,
    hasStarted: false
  },
  {
    name: 'fourth race',
    length: 'day',
    completedStatus: false,
    hasStarted: false
  }
]
const userRaceData = [
  {
    isOwner: true,
    acceptedInvitation: true,
    userId: 1,
    raceId: 1,
    dailyAverage: 8000,
    place: 1,
    differenceFromAverage: 4000,
    percentImprovement: 0.5
  },
  {
    isOwner: false,
    acceptedInvitation: true,
    userId: 3,
    raceId: 1,
    dailyAverage: 10000,
    place: 3,
    differenceFromAverage: 1000,
    percentImprovement: 0.1
  },
  {
    isOwner: false,
    acceptedInvitation: true,
    userId: 4,
    raceId: 1,
    dailyAverage: 6000,
    place: 2,
    differenceFromAverage: 1200,
    percentImprovement: 0.2
  },
  {
    isOwner: false,
    acceptedInvitation: true,
    userId: 2,
    raceId: 2,
    dailyAverage: 20000,
    place: 3,
    differenceFromAverage: -1000,
    percentImprovement: -0.05
  },
  {
    isOwner: false,
    acceptedInvitation: true,
    userId: 3,
    raceId: 2,
    dailyAverage: 10143,
    place: 1,
    differenceFromAverage: 1500,
    percentImprovement: 0.148
  },
  {
    isOwner: true,
    acceptedInvitation: true,
    userId: 4,
    raceId: 2,
    dailyAverage: 6171,
    place: 2,
    differenceFromAverage: 1000,
    percentImprovement: 0.162
  },
  {
    isOwner: false,
    acceptedInvitation: false,
    userId: 5,
    raceId: 2
  },
  {
    isOwner: true,
    acceptedInvitation: true,
    userId: 3,
    raceId: 3
  },
  {
    isOwner: false,
    acceptedInvitation: false,
    userId: 4,
    raceId: 3
  },
  {
    isOwner: false,
    acceptedInvitation: false,
    userId: 2,
    raceId: 3
  },
  {
    isOwner: false,
    acceptedInvitation: false,
    userId: 1,
    raceId: 3
  },
  {
    isOwner: true,
    acceptedInvitation: true,
    userId: 5,
    raceId: 4
  },
  {
    isOwner: false,
    acceptedInvitation: true,
    userId: 4,
    raceId: 4
  }
]

const seed = async () => {
  await db.sync({force: true})
  await Promise.all([
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
  await UserFriend.bulkCreate(userFriendData)
  await Race.bulkCreate(raceData)
  await UserRace.bulkCreate(userRaceData)

  console.log('Seeding success!')
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
