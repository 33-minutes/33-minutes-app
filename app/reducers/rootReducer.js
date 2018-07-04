import { combineReducers } from 'redux';
import meetingReducer from './meetingReducer';

export default combineReducers({
  meetings: meetingReducer
})