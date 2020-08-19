export type RouteHistory = {
  push: (route: string) => void,
  replace: (route: string) => void,
};

export enum Permission {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  _id: string;
  email: string;
  permission: string;
}
