import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { reducers } from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MAX_LIMIT_MOVIES } from '../constants/values.constants';

const initMovie = {};
const initMovies = {
  data: [],
  total: 0,
  offset: 0,
  limit: MAX_LIMIT_MOVIES,
  sortBy: 'vote_average',
  sortOrder: 'desc',
};
const initWindows = {
  isMobile: false,
};
const initSearchingParameters = {
  search: '',
  searchBy: '',
  limit: MAX_LIMIT_MOVIES,
  offset: 0,
  total: 0,
  sortBy: 'vote_average',
  sortOrder: 'desc',
};

export const initialState = {
  movies: initMovies,
  movie: initMovie,
  window: initWindows,
  searchingParameters: initSearchingParameters,
};

export const makeStore = (state = initialState) => {
  return createStore(
    combineReducers(reducers),
    state,
    composeWithDevTools(
      applyMiddleware(logger, thunkMiddleware),
    )
  );
};
