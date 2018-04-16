import { FETCH_MOVIE } from '../constants/types.constants';

// export const initialState = {};
import { initialState } from "../utils/create-store.util";


export function movie(state = initialState.movie, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_MOVIE:
      const { data: movie } = payload;

      return movie;
    default:
      return state;
  }
}