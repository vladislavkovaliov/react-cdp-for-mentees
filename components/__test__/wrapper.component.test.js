import React from 'react';
import { Wrapper } from '../wrapper.component';
import { shallow } from 'enzyme';

describe('<Wrapper />', () => {
  describe('Shapshot', () => {
    test('should render <Wrapper /> without children', () => {
      const wrapper = shallow(
        <Wrapper />
      );

      expect(wrapper).toMatchSnapshot();
    });

    test('should render <Wrapper /> with children', () => {
      const wrapper = shallow(
        <Wrapper>
          <div>mocks children</div>
        </Wrapper>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});