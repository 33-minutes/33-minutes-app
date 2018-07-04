import { FETCH_MEETINGS, NEW_MEETING, DELETE_MEETING } from '../actions/types'

const initialState = {
  items: [],
  item: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_MEETINGS: 
      return {
        ...state,
        items: action.payload
      }
    case NEW_MEETING:
      return {
        ...state,
        item: action.payload
      }
    case DELETE_MEETING:
      return {
        ...state,
        item: action.payload
      }    
    default:
      return state;
  }
}