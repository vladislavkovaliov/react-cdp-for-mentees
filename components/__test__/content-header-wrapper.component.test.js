import React from 'react';
import { ContentHeaderWrapper } from '../content-header-wrapper.component';

import shallow from 'enzyme/shallow';

describe('<ContentHeaderWrapper />', () => {
  test('Shapshot <ContentHeaderWrapper />', () => {
    const wrapper = shallow(
      <ContentHeaderWrapper>
        <div>hello</div>
      </ContentHeaderWrapper>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
