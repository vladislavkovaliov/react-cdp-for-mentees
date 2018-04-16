import React from 'react';
import { shallow } from 'enzyme';
import { HeaderContent, isValueInputValue, Header, mapStateToProps, mapDispatchToProps } from '../header';

import { connect } from 'react-redux';
import { searchMovies, clearMovies } from '../../../actions/movies.action';
import { updateSearchingParameters } from '../../../actions/searching-parameters.action';

jest.mock('react-redux', () => ({
  connect: jest.fn(() => jest.fn()),
}));

jest.mock('../../../actions/movies.action', () => ({
  searchMovies: jest.fn(),
  clearMovies: jest.fn(),
}));

const movies = {
  sortBy: 'vote_average',
  sortOrder: 'desc',
};

jest.mock('../../../actions/searching-parameters.action', () => ({
  updateSearchingParameters: jest.fn(),
}));

describe('<Header />', () => {
  describe('mapDispatchToProps', () => {
    test('should call searchMovies action', () => {
      const result = mapDispatchToProps(null /* dispatch */);

      result.searchMovies({});

      expect(searchMovies).toHaveBeenCalled();
    });

    test('should return object with method searchMovies', () => {
      const result = mapDispatchToProps(null /* dispatch */);

      expect(result).toHaveProperty('searchMovies');
    });
  });

  describe('mapStateToProps', () => {
    test('should return object with movies', () => {
      const movies = [1,2,3,4,5];
      const result = mapStateToProps({ movies });

      expect(result).toHaveProperty('movies', movies);
    });
  });

  describe('connect()', () => {
    test('should call connect with mapStateToProps and mapDispatchToProps', () => {
      expect(connect).toHaveBeenCalledWith(mapStateToProps, mapDispatchToProps);
    });
  });

  describe('Shapshot', () => {
    test('should render <HeaderContent /> with invalid input\'s value', () => {
      const wrapper = shallow(
        <HeaderContent />
      );

      expect(wrapper).toMatchSnapshot();
    });

    test('should render <HeaderContent /> with valid input\'s value', () => {
      const wrapper = shallow(
        <HeaderContent />
      );

      wrapper.setState({ isValid: true });

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    test('onChangeInput()', () => {
      const wrapper = shallow(
        <HeaderContent />
      );
      const event = {
        target: {
          value: 'newValue',
        },
      };
      const spy = jest.spyOn(HeaderContent.prototype, 'setState');

      wrapper.instance().onChangeInput(event);

      expect(spy).toHaveBeenCalled();
    });

    test('onChangeRadio()', () => {
      const wrapper = shallow(
        <HeaderContent />
      );
      const event = {
        target: {
          value: 'newValue',
        },
      };
      const spy = jest.spyOn(HeaderContent.prototype, 'setState');

      wrapper.instance().onChangeRadio(event);

      expect(spy).toHaveBeenCalled();
    });

    test('onSubmit() with invalid input value', () => {
      const mockSearchMovies = jest.fn();
      const mockUpdateSearchingParameters = jest.fn();
      const mockClearMovies = jest.fn();
      
      const wrapper = shallow(
        <HeaderContent
          searchMovies={mockSearchMovies}
          updateSearchingParameters={mockUpdateSearchingParameters}
          clearMovies={mockClearMovies}
          movies={movies}
        />
      );
      const event = {
        target: {
          value: 'newValue',
        },
        preventDefault: jest.fn(),
      };

      wrapper.instance().onSubmit(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockSearchMovies).toHaveBeenCalled();
    });

    test('onSubmit() with invalid filter value', () => {
      const mockSearchMovies = jest.fn();
      const mockUpdateSearchingParameters = jest.fn();
      const mockClearMovies = jest.fn();
      
      const wrapper = shallow(
        <HeaderContent
          searchMovies={mockSearchMovies}
          updateSearchingParameters={mockUpdateSearchingParameters}   
          clearMovies={mockClearMovies}
          movies={movies}
        />
      );
      const event = {
        target: {
          value: 'newValue',
        },
        preventDefault: jest.fn(),
      };
      wrapper.instance().state.searchValue = 'mock';
      wrapper.instance().state.searchBy = '';

      wrapper.instance().onSubmit(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockSearchMovies).not.toHaveBeenCalled();
    });

    test('onSubmit() with valid filter/input value', () => {
      const mockSearchMovies = jest.fn();
      const mockUpdateSearchingParameters = jest.fn();
      const mockClearMovies = jest.fn();

      const wrapper = shallow(
        <HeaderContent
          searchMovies={mockSearchMovies}
          updateSearchingParameters={mockUpdateSearchingParameters} 
          clearMovies={mockClearMovies}
          movies={movies}
        />
      );
      const event = {
        target: {
          value: 'newValue',
        },
        preventDefault: jest.fn(),
      };
      wrapper.instance().state.searchValue = 'mock';
      wrapper.instance().state.searchBy = 'mock';
      wrapper.instance().onSubmit(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockSearchMovies).toHaveBeenCalled();
    });
  });
});
