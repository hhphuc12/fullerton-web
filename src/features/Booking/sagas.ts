import { put, call, takeLatest } from 'redux-saga/effects';
import { ACTIONS, BookingAction } from './actions';
import { showLoading, hideLoading, LoadingKey } from 'features/Shared/actions';
import { callApi, apiMethod } from 'utils/apiCaller';
import { apiEndpoints } from 'features/Shared/constants';
import { IBooking, IEventType } from './model';

export function* getListBooking() {
  yield takeLatest(ACTIONS.GET_LIST_BOOKING, function* (action: BookingAction) {
    yield put(showLoading(LoadingKey.GET_LIST_BOOKING));
    try {
      const bookings: IBooking[] = yield call(
        callApi,
        apiEndpoints.bookings,
      );
      yield put(hideLoading(LoadingKey.GET_LIST_BOOKING));
      yield put({ type: ACTIONS.SAVE_LIST_BOOKING, bookings });
    }
    catch (error) {
      yield put(hideLoading(LoadingKey.GET_LIST_BOOKING));
      console.log('getListBooking: ', error);
    }
  });
}

export function* getListEventType() {
  yield takeLatest(ACTIONS.GET_LIST_EVENT_TYPE, function* (action: BookingAction) {
    yield put(showLoading(LoadingKey.GET_LIST_EVENT_TYPE));
    try {
      const eventTypes: IEventType[] = yield call(
        callApi,
        apiEndpoints.list_event_types,
      );
      yield put(hideLoading(LoadingKey.GET_LIST_EVENT_TYPE));
      yield put({ type: ACTIONS.SAVE_LIST_EVENT_TYPE, eventTypes });
    }
    catch (error) {
      yield put(hideLoading(LoadingKey.GET_LIST_EVENT_TYPE));
      console.log('getListEventTypes: ', error);
    }
  });
}

export function* createBooking() {
  yield takeLatest(ACTIONS.CREATE_BOOKING, function* (action: BookingAction) {
    const { booking } = action;
    yield put(showLoading(LoadingKey.CREATE_BOOKING));
    try {
      const createdBooking: IEventType[] = yield call(
        callApi,
        apiEndpoints.bookings,
        apiMethod.POST,
        booking,
      );
      yield put(hideLoading(LoadingKey.CREATE_BOOKING));
      yield put({ type: ACTIONS.SAVE_CREATED_BOOKING, booking: createdBooking });
    }
    catch (error) {
      yield put(hideLoading(LoadingKey.CREATE_BOOKING));
      console.log('createBooking: ', error);
    }
  });
}

export function* cancelBooking() {
  yield takeLatest(ACTIONS.CANCEL_BOOKING, function* (action: BookingAction) {
    const { bookingId } = action;
    yield put(showLoading(LoadingKey.CANCEL_BOOKING));
    try {
      yield call(
        callApi,
        `${apiEndpoints.bookings}/${bookingId}`,
        apiMethod.DELETE,
      );
      yield put(hideLoading(LoadingKey.CANCEL_BOOKING));
      yield put({ type: ACTIONS.UPDATE_BOOKING_AFTER_CANCEL, bookingId });
    }
    catch (error) {
      yield put(hideLoading(LoadingKey.CANCEL_BOOKING));
      console.log('cancelBooking: ', error);
    }
  });
}

export function* updateBooking() {
  yield takeLatest(ACTIONS.UPDATE_BOOKING, function* (action: BookingAction) {
    const { bookingId, booking } = action;
    yield put(showLoading(LoadingKey.UPDATE_BOOKING));
    try {
      const updatedBooking: IEventType[] = yield call(
        callApi,
        `${apiEndpoints.bookings}/${bookingId}`,
        apiMethod.PATCH,
        booking,
      );
      yield put(hideLoading(LoadingKey.UPDATE_BOOKING));
      yield put({ type: ACTIONS.UPDATE_BOOKING_LIST_AFTER_UPDATE, booking: updatedBooking });
    }
    catch (error) {
      yield put(hideLoading(LoadingKey.UPDATE_BOOKING));
      console.log('updateBooking: ', error);
    }
  });
}
