import axios from 'axios'

const GET_RACE_INFO = 'GET_RACE_INFO'

const getRaceInfo = race => ({
  type: GET_RACE_INFO,
  race
})

const fetchRaceInfoFromServer = raceId => async dispatch => {
  try {
    const {data} = await axios.get(`api/${raceId}`)
    const race = data
    dispatch(getRaceInfo(race))
  } catch (err) {
    console.log(err)
  }
}
