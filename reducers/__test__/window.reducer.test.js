import { window } from '../window.reducer';
import { UPDATE_VIEWPORT } from '../../constants/types.constants';

import { initialState }  from '../../utils/create-store.util';

describe('[window.reducer.js]', () => {
  test('should return initial state if type is undefined', () => {
    const state = window(initialState.window, {});

    expect(state).toEqual(initialState.window);
  });

  test('should return window from payload if type is \'UPDATE_VIEWPORT\'', () => {
    const payload = {
      isMobile: true,
    };
    const state = window(
      initialState.window,
      {
        type: UPDATE_VIEWPORT,
        payload
      }
    );

    expect(state).toEqual(payload);
  });
});