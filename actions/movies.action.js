import axios from 'axios';

const axiosMovies = axios.create({
  baseURL: 'http://react-cdp-api.herokuapp.com/movies',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

import { 
  FETCH_MOVIES, 
  CLEAR_MOVIES,
  UPDATE_SORT_BY 
} from '../constants/types.constants';

export function searchMovies(dispatch, payload) {
  const { search, searchBy, offset, limit, internalOffset, sortBy, sortOrder } = payload;

  return axiosMovies.get(`?search=${search}&searchBy=${searchBy}&sortBy=${sortBy}&sortOrder=${sortOrder}&offset=${offset}&limit=${limit}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_MOVIES,
        payload: Object.assign({}, data, { internalOffset }),
      });

      return {
        type: FETCH_MOVIES,
        payload: Object.assign({}, data, { internalOffset }),
      };
    })
    .catch(err => {
      console.log(err);
    });
}

export function clearMovies(dispatch, payload) {
  dispatch({
    type: CLEAR_MOVIES,
    payload,
  });
}

export function updateSortByValue(dispatch, payload) {
  dispatch({
    type: UPDATE_SORT_BY,
    payload,
  });
}
