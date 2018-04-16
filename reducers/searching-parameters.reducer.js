import { initialState } from '../utils/create-store.util';
import { UPDATE_SEACHING_PARAMETERS } from '../constants/types.constants';

export function searchingParameters(state = initialState.searchingParameters, action) {
  const { type, payload } = action;

  switch(type) {
    case UPDATE_SEACHING_PARAMETERS: 
      return Object.assign({}, state, payload);
      break;
    default: 
      return state;
      break;
  }
}