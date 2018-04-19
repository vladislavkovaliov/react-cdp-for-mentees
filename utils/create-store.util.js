import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { reducers } from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  MAX_LIMIT_MOVIES,
  DEFAULT_SORT_BY,
  DEFAULT_SEARCH_BY,
  DEFAULT_OFFSET,
  DEFAULT_SORT_ORDER,
  EMPTY_STRING,
} from '../constants/values.constants';

const initMovie = {};
const initMovies = {
  data:      [],
  total:     0,
  offset:    DEFAULT_OFFSET,
  limit:     MAX_LIMIT_MOVIES,
  sortBy:    DEFAULT_SORT_BY,
  sortOrder: DEFAULT_SORT_ORDER,
};
const initWindows = {
  isMobile: false,
};
const initSearchingParameters = {
  search:    EMPTY_STRING,
  searchBy:  DEFAULT_SEARCH_BY,
  limit:     MAX_LIMIT_MOVIES,
  offset:    DEFAULT_OFFSET,
  total:     0,
  sortBy:    DEFAULT_SORT_BY,
  sortOrder: DEFAULT_SORT_ORDER,
};

export const initialState = {
  movies:              initMovies,
  movie:               initMovie,
  window:              initWindows,
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
