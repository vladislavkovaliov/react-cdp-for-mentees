import React from 'react';
import { Pagination, mapStateToProps, mapDispatchToProps } from '../pagination.component';
import { updateViewport } from '../../actions/viewport.action';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../../utils/create-store.util';

import shallow from 'enzyme/shallow';

jest.mock('../../actions/viewport.action', () => ({
  updateViewport: jest.fn(),
}));

jest.mock('../../utils/create-store.util', () => ({
  makeStore: jest.fn(),
}));

jest.mock('next-redux-wrapper', () => {
  return jest.fn(() => jest.fn());
});

describe('<Pagination />', () => {
  describe('connect()', () => {
    test('should call connect with mapStateToProps and mapDispatchToProps', () => {
      expect(withRedux).toHaveBeenCalledWith(makeStore, mapStateToProps, mapDispatchToProps);
    });
  });

  describe('mapStateToProps', () => {
    test('should return object with movies', () => {
      const window = {
        isMobile: false,
      };
      const result = mapStateToProps({ window });

      expect(result).toHaveProperty('window', window);
    });
  });

  describe('mapDispatchToProps', () => {
    test('should call searchMovies action', () => {
      const result = mapDispatchToProps(null /* dispatch */);

      result.updateViewport({});

      expect(updateViewport).toHaveBeenCalled();
    });

    test('should return object with method updateViewport', () => {
      const result = mapDispatchToProps(null /* dispatch */);

      expect(result).toHaveProperty('updateViewport');
    });
  });

  describe('Shaphot', () => {
    test('Shapshot <Pagination /> via desktop', () => {
      const wrapper = shallow(
        <Pagination
          updateViewport={updateViewport}
          window={{ isMobile: false }}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    test('Shapshot <Pagination /> via mobile', () => {
      const wrapper = shallow(
        <Pagination
          updateViewport={updateViewport}
          window={{ isMobile: true }}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
