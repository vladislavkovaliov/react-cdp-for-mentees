import { movies } from '../movies.reducer';
import {
  FETCH_MOVIES,
  CLEAR_MOVIES,
  UPDATE_SORT_BY,
} from '../../constants/types.constants';

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

  test('should remove all movies from state if type is \'CLEAR_MOVIES\'', () => {
    const state = movies(initialState.movies, { type: CLEAR_MOVIES });

    expect(state.data.length).toEqual(0);
  });

  test('should return state if movies array is empty', () => {
    const state = movies(initialState.movies, { type: UPDATE_SORT_BY, payload: { sortBy: 'rating' } });

    expect(state.data.length).toEqual(0);
  });

  test('should return sorted state by rating', () => {
    const unsortedMovies = [
      { 'vote_average': 7, },
      { 'vote_average': 1, },
      { 'vote_average': 0, },
      { 'vote_average': 0, },
      { 'vote_average': 3, },
      { 'vote_average': 18, },
    ];

    const sortedMovies = [
      { 'vote_average': 18, },
      { 'vote_average': 7, },
      { 'vote_average': 3, },
      { 'vote_average': 1, },
      { 'vote_average': 0, },
      { 'vote_average': 0, },
    ];

    const originState = {
      data: unsortedMovies,
    };

    const state = movies(originState, { type: UPDATE_SORT_BY, payload: { sortBy: 'vote_average' } });

    expect(state.data).toEqual(sortedMovies);
  });

  test('should return sorted state by release date', () => {
    const unsortedMovies = [
      { 'release_date': '2011-02-05', },
      { 'release_date': '2000-12-12', },
      { 'release_date': '2018-01-01', },
      { 'release_date': '1993-11-11', },
    ];

    const sortedMovies = [
      { 'release_date': '2018-01-01', },
      { 'release_date': '2011-02-05', },
      { 'release_date': '2000-12-12', },
      { 'release_date': '1993-11-11', },
    ];

    const originState = {
      data: unsortedMovies,
    };

    const state = movies(originState, { type: UPDATE_SORT_BY, payload: { sortBy: 'release_date' } });

    expect(state.data).toEqual(sortedMovies);
  });
});