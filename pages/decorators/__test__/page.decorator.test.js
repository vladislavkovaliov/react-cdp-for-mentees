import React from 'react';
import { Page } from '../page.decorator';

import shallow from 'enzyme/shallow';

describe('<Page />', () => {
  test('Shapshot <Page />', () => {
    const wrapper = shallow(
      <Page />
    );

    expect(wrapper).toMatchSnapshot();
  });
});