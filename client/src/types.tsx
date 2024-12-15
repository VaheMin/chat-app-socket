export interface IReduxState {
  main: IMainState;
}

export interface IMainState {
  user: IUser;
}

export interface IUser {
  name: string | null;
  token: string | null;
}

export interface IUserAuthPostData {
  name: string;
  password: string;
}

export interface IUserData {
  name: string | null;
  token: string | null;
  status: string;
}
