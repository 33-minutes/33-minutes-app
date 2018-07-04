import { FETCH_MEETINGS, NEW_MEETING, DELETE_MEETING } from './types'

export function fetchMeetings() {
  return function(dispatch) {
    dispatch({
      type: FETCH_MEETINGS,
      payload: []
    })
  }
}

export function createMeeting(meetingData) {
  return function(dispatch) {
    dispatch({
      type: NEW_MEETING,
      payload: meetingData
    })
  }
}

export function deleteMeeting(meetingData) {
  return function(dispatch) {
    dispatch({
      type: DELETE_MEETING,
      payload: meetingData
    })
  }
}
