import { combineReducers } from 'redux';
import shared from 'features/Shared/reducers';
import auth from 'features/Auth/reducers';
import booking from 'features/Booking/reducers';

export default combineReducers({
  shared,
  auth,
  booking,
});
