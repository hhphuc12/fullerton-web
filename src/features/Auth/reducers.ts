import { ACTIONS, AuthAction } from './actions';
import { ACTIONS as SHARED_ACTION } from '../Shared/actions';

type AuthState = {
  token: string | null;
}

export const commonState: AuthState = {
  token: null,
};

export default (state = commonState, action: Partial<AuthAction>) => {
  switch (action.type) {
    case ACTIONS.SAVE_ACCESS_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SHARED_ACTION.CLEAR_STORE:
      return { ...commonState };
    default:
      return state;
  }
};
