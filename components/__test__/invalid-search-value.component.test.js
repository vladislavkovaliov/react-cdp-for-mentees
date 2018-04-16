import React from 'react';
import { InvalidSearchValue } from '../invalid-search-value.component';
import { shallow } from 'enzyme';

describe('<InvalidSearchValue />', () => {
  describe('Shapshot', () => {
    test('should render <InvalidSearchValue /> in invalid state', () => {
      const wrapper = shallow(
        <InvalidSearchValue isValid={false}>mocks children</InvalidSearchValue>
      );

      expect(wrapper).toMatchSnapshot();
    });

    test('should render <InvalidSearchValue /> in valid state', () => {
      const wrapper = shallow(
        <InvalidSearchValue isValid>mocks children</InvalidSearchValue>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});