import { updateSearchingParameters } from '../searching-parameters.action';
import { UPDATE_SEACHING_PARAMETERS } from '../../constants/types.constants';

const mockDispatch = jest.fn();

describe('[searching-parameters.action.js]', () => {
  test('should call dispatch with action', () => {
    updateSearchingParameters(mockDispatch, null);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: UPDATE_SEACHING_PARAMETERS,
      payload: null,
    });
  });
});