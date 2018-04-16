import { initialState } from '../utils/create-store.util';
import { UPDATE_VIEWPORT } from '../constants/types.constants';

export function window(state = initialState.window, action) {
  const { type, payload } = action;

  switch(type) {
    case UPDATE_VIEWPORT:
      return Object.assign({}, state, payload);
    default:
      return initialState.window;
  }
}
