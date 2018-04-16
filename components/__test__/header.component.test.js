import React from 'react';
import { HeaderWrapper } from '../header.component';
import { shallow } from 'enzyme';

describe('<HeaderWrapper />', () => {
  describe('Shapshot', () => {
    test('should render <HeaderWrapper />', () => {
      const wrapper = shallow(
        <HeaderWrapper>
          <div>mocks children</div>
        </HeaderWrapper>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});