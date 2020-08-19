import { put, takeLatest, call } from 'redux-saga/effects';
import { ACTIONS, SharedAction } from './actions';
import { IUser } from './declarations';
import { apiEndpoints } from './constants';
import { callApi, apiMethod } from 'utils/apiCaller';

export function* clearStore() {
  yield takeLatest(ACTIONS.CLEAR_STORE, function* (action: SharedAction) {
    yield put({ type: ACTIONS.CLEAR_STORE });
  });
}

export function* getUserInfo() {
  yield takeLatest(ACTIONS.GET_USER_INFO, function* (action: SharedAction) {
    try {
      const user: IUser[] = yield call(
        callApi,
        apiEndpoints.current_user,
        apiMethod.GET,
      );
      yield put({ type: ACTIONS.SAVE_USER_INFO, user });
    }
    catch (error) {
      console.log('getUserInfo: ', error);
    }
  });
}
