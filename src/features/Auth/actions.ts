export enum ACTIONS {
  SIGN_IN = 'SIGN_IN',
  SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN',
}

export type AuthAction = {
  type: string;
  email: string;
  password: string;
  token: string;
};

export const signIn = (email: string, password: string): Partial<AuthAction> => {
  return {
    type: ACTIONS.SIGN_IN,
    email,
    password,
  };
};
