import { updateViewport } from '../viewport.action';
import { UPDATE_VIEWPORT } from '../../constants/types.constants';

const mockDispatch = jest.fn();

describe('[viewport.action.js]', () => {
  test('should call dispatch with action', () => {
    updateViewport(mockDispatch, null);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: UPDATE_VIEWPORT,
      payload: null,
    });
  });
});