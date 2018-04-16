import { UPDATE_SEACHING_PARAMETERS } from '../constants/types.constants';

export function updateSearchingParameters(dispatch, payload) {
  return dispatch({
    type: UPDATE_SEACHING_PARAMETERS,
    payload,
  });
}