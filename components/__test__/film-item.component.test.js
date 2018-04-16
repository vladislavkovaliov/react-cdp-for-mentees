import React from 'react';
import { FilmItem } from '../film-item.component';

import shallow from 'enzyme/shallow';

describe('<FilmItem />', () => {
  test('Shapshot <FilmItem />', () => {
    const wrapper = shallow(
      <FilmItem
        releaseDate="2007-12-12"
        genres={[ 'drama', 'western' ]}
        vote_average="4.6"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
