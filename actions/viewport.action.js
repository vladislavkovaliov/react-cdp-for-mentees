import { UPDATE_VIEWPORT } from '../constants/types.constants'

export function updateViewport(dispatch, payload) {
  dispatch({
    type: UPDATE_VIEWPORT,
    payload,
  });
}