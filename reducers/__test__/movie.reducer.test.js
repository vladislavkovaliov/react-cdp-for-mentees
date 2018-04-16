import { movie } from '../movie.reducer';
import { FETCH_MOVIE } from '../../constants/types.constants';

import { initialState }  from '../../utils/create-store.util';

describe('[movie.reducer.js]', () => {
  test('should return initial state if type is undefined', () => {
    const state = movie(initialState.movie, {});

    expect(state).toBe(initialState.movie);
  });

  test('should return movies from payload if type is \'FETCH_MOVIES\'', () => {
    const payload = {
      data: {
        id: 'id',
        title: 'title',
      }
    };
    const state = movie(initialState.movie, { type: FETCH_MOVIE, payload });

    expect(state).toBe(payload.data);
  });
});