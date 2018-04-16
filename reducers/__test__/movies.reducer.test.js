import { movies } from '../movies.reducer';
import { FETCH_MOVIES } from '../../constants/types.constants';

import { initialState }  from '../../utils/create-store.util';

describe('[movies.reducer.js]', () => {
  test('should return initial state if type is undefined', () => {
    const state = movies(initialState.movies, {});

    expect(state).toEqual(initialState.movies);
  });

  test('should return movies from payload if type is \'FETCH_MOVIES\'', () => {
    const payload = {
      data: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
      ],
    };

    const state = movies(initialState.movies, { type: FETCH_MOVIES, payload });

    expect(state.data).toEqual(payload.data);
  });
});