import { put, call, takeLatest } from 'redux-saga/effects';
import { ACTIONS, AuthAction } from './actions';
import { showLoading, hideLoading, LoadingKey } from 'features/Shared/actions';
import { callApi, apiMethod } from 'utils/apiCaller';
import { apiEndpoints } from 'features/Shared/constants';
import LocalStorage from 'utils/localStorage';

export function* signIn() {
  yield takeLatest(ACTIONS.SIGN_IN, function* (action: AuthAction) {
    const { email, password } = action;
    yield put(showLoading(LoadingKey.SIGN_IN));
    try {
      const response: { token: string } = yield call(
        callApi,
        apiEndpoints.sign_in,
        apiMethod.POST,
        { email, password },
      );
      yield put(hideLoading(LoadingKey.SIGN_IN));
      const token = `Bearer ${response.token}`;
      LocalStorage.saveAccessToken(token);
      yield put({ type: ACTIONS.SAVE_ACCESS_TOKEN, token });
    }
    catch (error) {
      yield put(hideLoading(LoadingKey.SIGN_IN));
      console.log('signIn: ', error);
    }
  });
}
