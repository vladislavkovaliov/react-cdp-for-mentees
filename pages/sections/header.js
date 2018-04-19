import React, { Component } from 'react';
import { RadioButton } from '../../components/radio-btn.component';
import { connect } from 'react-redux';
import { searchMovies, clearMovies } from '../../actions/movies.action';
import isEmpty from 'lodash/isEmpty';
import { HeaderWrapper } from '../../components/header.component';
import { HeaderTitle } from '../../components/header-title.component';
import { updateSearchingParameters } from '../../actions/searching-parameters.action';
import { InvalidSearchValue } from '../../components/invalid-search-value.component';
import { isValueInputValue } from '../../utils/is-valid-input-value.util';
import {
  DEFAULT_SEARCH_BY,
  EMPTY_STRING,
  MAX_LIMIT_MOVIES,
  DEFAULT_OFFSET,
} from '../../constants/values.constants';

export class HeaderContent extends Component {
  state = {
    search: EMPTY_STRING,
    searchBy: DEFAULT_SEARCH_BY,
    isValid: false,
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { search, searchBy } = this.state;
    const { searchMovies, updateSearchingParameters, clearMovies } = this.props;
    const { sortBy, sortOrder } = this.props.movies;

    if(isEmpty(search) || isEmpty(searchBy)) {
      // alert('You missed search value or did set filter value');
      return;
    }

    clearMovies();
    updateSearchingParameters({ search, searchBy, offset: DEFAULT_OFFSET, limit: MAX_LIMIT_MOVIES });
    searchMovies({ search, searchBy, sortBy, sortOrder, offset: DEFAULT_OFFSET, internalOffset: 0 });
  };

  onChangeInput = (event) => {
    const { searchBy } = this.state;
    const { value: search } = event.target;

    this.setState({ search, searchBy, isValid: isValueInputValue(search) });
  };

  onChangeRadio = (event) => {
    const { value: searchBy } = event.target;

    this.setState({ searchBy });
  };

  render() {
    const { isValid, search, searchBy } = this.state;

    return (
      <HeaderWrapper>
        <form method="#" action="#" onSubmit={this.onSubmit}>
          <HeaderTitle />
          <div className="header__content">
            <div className="header__content-title">find your movie</div>
            <input
              type="text"
              autoFocus
              className="header__content-input"
              onChange={this.onChangeInput}
              value={search}
            />
            <InvalidSearchValue isValid={isValid}>Should be more than 3 symbols</InvalidSearchValue>
          </div>

          <div className="header__footer">
            <div>
              <p>search by</p>
              <RadioButton
                name="filter"
                id="title"
                value="title"
                text="title"
                onChange={this.onChangeRadio}
                isChecked={searchBy === 'title'}
              />
              {/* TODO: should replace to genre */}
              <RadioButton
                name="filter"
                id="genres"
                value="genres"
                text="genres"
                onChange={this.onChangeRadio}
                isChecked={searchBy === 'genres'}
              />
            </div>
            <button id="search-btn" type="submit">search</button>
          </div>
        </form>
      </HeaderWrapper>
    );
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
});

export const mapDispatchToProps = (dispatch) => ({
  searchMovies:              payload => searchMovies(dispatch, payload),
  updateSearchingParameters: payload => updateSearchingParameters(dispatch, payload),
  clearMovies:               payload => clearMovies(dispatch, null),
});

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderContent);