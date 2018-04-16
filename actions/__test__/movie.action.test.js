import nock from 'nock';

import { searchMovie } from '../movie.action.js'
import { FETCH_MOVIE } from '../../constants/types.constants';

const mockDispatch = jest.fn();

const axiosMock = nock('http://react-cdp-api.herokuapp.com/movies')
  .defaultReplyHeaders({ 'access-control-allow-origin': '*' });

const id = '1111';

describe('[movie.action.js]', () => {
  test('should call dispatch with action', (done) => {
    const expectedResponse = {
      date: [],
      limit: 10,
      total: 942,
      offset: 0
    };
    axiosMock.get(`/${id}`)
      .reply(200, expectedResponse);

    searchMovie(mockDispatch, { id })
      .then(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: FETCH_MOVIE,
          payload: expectedResponse,
        });

        done();
      })
      .catch(() => {
        done();
      });
  });

  test('should eject with error', (done) => {
    axiosMock.get(`/${id}`)
      .replyWithError(500, null);

    searchMovie(mockDispatch, { id })
      .then(() => {
        expect(mockDispatch).not.toHaveBeenCalledWith({
          type: FETCH_MOVIE,
          payload: expectedResponse,
        });

        done();
      })
      .catch(() => {
        done();
      });
  });
});