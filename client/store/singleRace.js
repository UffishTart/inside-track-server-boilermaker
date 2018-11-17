import axios from 'axios'

const GET_RACE_INFO = 'GET_RACE_INFO'
const UPDATE_RACE_INFO = 'UPDATE_RACE_INFO'

const getRaceInfo = race => ({
  type: GET_RACE_INFO,
  race
})

const updateRaceInfo = race => ({
  type: UPDATE_RACE_INFO,
  race
})
export const fetchRaceInfoFromServer = raceId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/races/${raceId}`)
    const race = data
    dispatch(getRaceInfo(race))
  } catch (err) {
    console.log(err)
  }
}

export const updateRaceInfoFromServer = (
  raceId,
  raceInfo
) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/races/${raceId}`, raceInd)
  } catch (err) {
    console.log(err)
  }
}
