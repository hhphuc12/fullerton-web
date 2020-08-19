import { all } from 'redux-saga/effects';
import { signIn } from 'features/Auth/sagas';
import {
  getListBooking,
  getListEventType,
  createBooking,
  cancelBooking,
  updateBooking,
} from 'features/Booking/sagas';
import { getUserInfo, clearStore } from 'features/Shared/sagas';

export default function* rootSaga() {
  yield all([
    signIn(),
    getListBooking(),
    getListEventType(),
    createBooking(),
    cancelBooking(),
    getUserInfo(),
    clearStore(),
    updateBooking(),
  ]);
}
