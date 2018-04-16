import { 
  FETCH_MOVIES, 
  CLEAR_MOVIES,
  UPDATE_SORT_BY 
} from '../constants/types.constants';

import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';

import { initialState } from '../utils/create-store.util';

import { sortByRating } from '../utils/sort-by-rating.util'; 
import { sortByReleaseDate } from '../utils/sort-by-release-date.util';

export function movies(state = initialState.movies, action) {
  const { type, payload } = action;
  const { data: movies } = state;

  let newState = null;

  switch (type) {
    case FETCH_MOVIES:
      newState = cloneDeep(state);

      const newMovies = uniqBy(movies.concat(payload.data), 'id');

      return {
        data: newMovies,
        sortBy: newState.sortBy,
        internalOffset: newState.internalOffset,

        offset: payload.offset,
        limit: payload.limit,
        total: payload.total,
      };

    case UPDATE_SORT_BY:
      newState = cloneDeep(state);

      if(payload.sortBy === 'release_date') {
        newState.data = newState.data.slice().sort(sortByReleaseDate);
      } else if (payload.sortBy === 'vote_average') {
        newState.data.sort(sortByRating());
      }

      return newState;

    case CLEAR_MOVIES: 
      return Object.assign({}, initialState.movies);

    default:
      return Object.assign({}, state);
  }
}