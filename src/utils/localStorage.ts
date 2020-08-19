export enum localStorageKeys {
  ACCESS_TOKEN = 'access_token',
};

const getAccessToken = (): string | null => {
  return localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
};

const saveAccessToken = (token: string) => {
  localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token);
};

const removeAll = () => localStorage.clear();

export default {
  getAccessToken,
  saveAccessToken,
  removeAll,
};
