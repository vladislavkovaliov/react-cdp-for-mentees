import React from 'react';
import { RadioButton } from '../radio-btn.component';
import { shallow } from 'enzyme';

const mockOnChange = jest.fn();

describe('<RadioButton />', () => {
  describe('Shapshot', () => {
    test('should render <RadioButton /> with default option', () => {
      const wrapper = shallow(
        <RadioButton
          value="title"
          name="title"
          id="title"
          onChange={mockOnChange}
          isChecked={true}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    test('should render <RadioButton /> without default option', () => {
      const wrapper = shallow(
        <RadioButton
          value="title"
          name="title"
          id="title"
          onChange={mockOnChange}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {

  });
});
