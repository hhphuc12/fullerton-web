import { ACTIONS, SharedAction } from './actions';
import { ACTIONS as SHARED_ACTION } from '../Shared/actions';
import { IUser } from './declarations';

type CommonState = {
  loadingKeys: string[];
  user?: IUser
}

export const commonState: CommonState = {
  loadingKeys: [],
};

export default (state = commonState, action: SharedAction) => {
  switch (action.type) {
    case ACTIONS.SHOW_LOADING:
      return {
        ...state,
        loadingKeys: [ ...state.loadingKeys, action.key ],
      };
    case ACTIONS.HIDE_LOADING:
      return {
        ...state,
        loadingKeys: [...state.loadingKeys.filter(key => key !== action.key)],
      };
    case ACTIONS.SAVE_USER_INFO:
      return {
        ...state,
        user: action.user,
      };
    case SHARED_ACTION.CLEAR_STORE:
      return { ...commonState };
    default:
      return state;
  }
};
