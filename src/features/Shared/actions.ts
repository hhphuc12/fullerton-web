import { IUser } from "./declarations";

export enum LoadingKey {
  SIGN_IN = 'SIGN_IN',
  GET_LIST_BOOKING = 'GET_LIST_BOOKING',
  GET_LIST_EVENT_TYPE = 'GET_LIST_EVENT_TYPE',
  CREATE_BOOKING = 'CREATE_BOOKING',
  CANCEL_BOOKING = 'CANCEL_BOOKING',
  UPDATE_BOOKING = 'UPDATE_BOOKING',
}

export enum ACTIONS {
  SHOW_LOADING = 'SHOW_LOADING',
  HIDE_LOADING = 'HIDE_LOADING',
  CLEAR_STORE = 'CLEAR_STORE',
  CLEAR_REDUCERS = 'CLEAR_REDUCERS',
  GET_USER_INFO = 'GET_USER_INFO',
  SAVE_USER_INFO = 'SAVE_USER_INFO',
};

export type SharedAction = {
  type : string;
  key?: string;
  user?: IUser;
};

export const showLoading = (key: string): SharedAction => {
  return {
    type: ACTIONS.SHOW_LOADING,
    key,
  };
};

export const hideLoading = (key: string): SharedAction => {
  return {
    type: ACTIONS.HIDE_LOADING,
    key,
  };
};

export const clearStore = (): SharedAction => {
  return {
    type: ACTIONS.CLEAR_STORE,
  };
};

export const getUserInfo = (): SharedAction => {
  return {
    type: ACTIONS.GET_USER_INFO,
  };
};
