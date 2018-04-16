import React from 'react';
import { HeaderTitle } from '../header-title.component';
import { shallow } from 'enzyme';

describe('<HeaderTitle />', () => {
  describe('Shapshot', () => {
    test('should render <HeaderTitle /> without children', () => {
      const wrapper = shallow(
        <HeaderTitle />
      );

      expect(wrapper).toMatchSnapshot();
    });

    test('should render <HeaderTitle /> with children', () => {
      const wrapper = shallow(
        <HeaderTitle>
          <div>mocks children</div>
        </HeaderTitle>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});