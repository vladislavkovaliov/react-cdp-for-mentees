import nock from 'nock';

import {
  searchMovies,
  clearMovies,
  updateSortByValue
} from '../movies.action';

import {
  FETCH_MOVIES,
  CLEAR_MOVIES,
  UPDATE_SORT_BY
} from '../../constants/types.constants';

const mockDispatch = jest.fn();

const axiosMock = nock('http://react-cdp-api.herokuapp.com/movies')
  .defaultReplyHeaders({ 'access-control-allow-origin': '*' });

let expectedRes = null;
let payload = null;

describe('[movies.action.js]', () => {
  describe('searchMovies()', () => {
    beforeEach(() => {
      expectedRes = {
        date: [],
        limit: 10,
        total: 942,
        offset: 0
      };

      payload = {
        search: 'action',
        searchBy: 'title',
        offset: 0,
        limit: 10,
        internalOffset: 0,
        sortBy: 'vote_average',
        sortOrder : 'desc',
      };
    });

    test('should call dispatch with action', (done) => {
      const { search, searchBy, offset, limit, sortBy, sortOrder } = payload;

      axiosMock.get(`/?search=${search}&searchBy=${searchBy}&sortBy=${sortBy}&sortOrder=${sortOrder}&offset=${offset}&limit=${limit}`)
        .reply(200, expectedRes);

      searchMovies(mockDispatch, payload)
        .then(() => {
          expect(mockDispatch).toHaveBeenCalledWith({
            type: FETCH_MOVIES,
            payload: expectedRes,
          });

          done();
        })
        .catch(() => {
          done();
        });
    });

    test('should eject with error', (done) => {
      const { search, searchBy, offset, limit, sortBy, sortOrder } = payload;

      axiosMock.get(`/?search=${search}&searchBy=${searchBy}&sortBy=${sortBy}&sortOrder=${sortOrder}&offset=${offset}&limit=${limit}`)
        .replyWithError(500, null);

      searchMovies(mockDispatch, payload)
        .then(() => {
          expect(mockDispatch).not.toHaveBeenCalledWith({
            type: FETCH_MOVIE,
            payload: expectedRes,
          });

          done();
        })
        .catch(() => {
          done();
        });
    });
  });

  describe('clearMovies()', () => {
    test('should call dispatch with args', () => {
      clearMovies(mockDispatch, null);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: CLEAR_MOVIES,
        payload: null,
      });
    });
  });

  describe('updateSortByValue()', () => {
    test('should call dispatch with args', () => {
      updateSortByValue(mockDispatch, null);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: UPDATE_SORT_BY,
        payload: null,
      });
    });
  });
});