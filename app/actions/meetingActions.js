import { FETCH_MEETINGS, NEW_MEETING, DELETE_MEETING } from './types'

export function fetchMeetings() {
  return function(dispatch) {
    dispatch({
      type: FETCH_MEETINGS,
      payload: []
    })
  }
}

export function createMeeting(data) {
  return function(dispatch) {
    dispatch({
      type: NEW_MEETING,
      payload: {
        startDateTime: data.startDateTime
      }
    })
  }
}

export function deleteMeeting(data) {
  return function(dispatch) {
    dispatch({
      type: DELETE_MEETING,
      payload: {
        key: data.key
      }
    })
  }
}
