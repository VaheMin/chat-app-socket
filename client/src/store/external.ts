import { Dispatch } from 'redux';

import { IReduxState } from '../types';
import store from './index';

// eslint-disable-next-line @typescript-eslint/unbound-method
export const { getState } = store;
export const { dispatch }: { dispatch: Dispatch } = store;

export function getSelectors<T>(processor: (state: IReduxState) => T): T {
  return processor(getState());
}
