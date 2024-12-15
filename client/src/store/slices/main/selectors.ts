import { IReduxState } from '../../../types';

export const getMainSlice = (state: IReduxState) => state.main;

export const getUserData = (state: IReduxState) => getMainSlice(state).user;
