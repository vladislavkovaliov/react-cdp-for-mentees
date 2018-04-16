import { searchingParameters } from '../searching-parameters.reducer';
import { UPDATE_SEACHING_PARAMETERS } from '../../constants/types.constants';

import { initialState }  from '../../utils/create-store.util';

describe('[searching-parameters.reducer.js]', () => {
  test('should return initial state if type is undefined', () => {
    const state = searchingParameters(initialState.searchingParameters, {});

    expect(state).toEqual(initialState.searchingParameters);
  });

  test('should return searchingParameters from payload if type is \'UPDATE_SEACHING_PARAMETERS\'', () => {
    const payload = {
      search: 'man in black',
      searchBy: 'title',
      limit: 10,
      offset: 0,
      total: 0,
      sortBy: 'vote_average',
      sortOrder: 'desc',
    };
    const state = searchingParameters(
      initialState.searchingParameters,
      {
        type: UPDATE_SEACHING_PARAMETERS,
        payload
      }
    );

    expect(state).toEqual(payload);
  });
});