import axios from 'axios';

const axiosMovies = axios.create({
  baseURL: 'http://react-cdp-api.herokuapp.com/movies',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

import { FETCH_MOVIE } from '../constants/types.constants';

export function searchMovie(dispatch, payload) {
  const { id } = payload;
  console.log(22242);

  return axiosMovies.get(`/${id}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_MOVIE,
        payload: { data },
      });

      return {
        type: FETCH_MOVIE,
        payload: data,
      };
    })
    .catch(err => {
      console.log(err);
    });
}