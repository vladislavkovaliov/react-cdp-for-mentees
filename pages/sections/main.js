import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from 'lodash/isEmpty';

import { RadioButton } from '../../components/radio-btn.component';
import { FilmItem } from '../../components/film-item.component';
import { ContentHeaderWrapper } from '../../components/content-header-wrapper.component';
import Pagination from '../../components/pagination.component';
import '../../components/pagination.scss';

import { MAX_LIMIT_MOVIES } from '../../constants/values.constants';
import { updateSearchingParameters } from '../../actions/searching-parameters.action';

import slice from 'lodash/slice';

import { 
  searchMovies, 
  updateSortByValue, 
  clearMovies } from '../../actions/movies.action';
import FilmsList from '../../components/films-list.component';

export class MainContent extends Component {
  state = {
    sortBy: 'vote_average',
    sortOrder: 'desc',
    offset: '',
    currentPage: 0,
  };

  onPageChange = ({ selected }) => {
    const { updateSearchingParameters, searchMovies } = this.props;
    const { currentPage } = this.state;

    const direction = selected > currentPage;

    if(direction) {
      updateSearchingParameters({ offset: (selected * MAX_LIMIT_MOVIES) });
    } else {
      updateSearchingParameters({ offset: (selected * MAX_LIMIT_MOVIES) });
    }

    searchMovies(
      Object.assign(
        {},
        this.props.searchingParameters,
        { offset: (selected * MAX_LIMIT_MOVIES) }
      )
    );

    this.setState({ currentPage: selected });
  };

  onChangeSortBy = (event) => {
    const { value: sortBy } = event.target;
    const {
      searchMovies,
      updateSearchingParameters,
      searchingParameters,
      clearMovies,
      updateSortByValue,
    } = this.props;

    this.setState({ sortBy, currentPage: 0 });
    updateSearchingParameters({ sortBy, offset: 0 });
    updateSortByValue({ sortBy, offset: 0 });

    if(isEmpty(searchingParameters.search) && isEmpty(searchingParameters.searchBy)) {
      return;
    }

    clearMovies();
    searchMovies(Object.assign({}, searchingParameters, { sortBy, offset: 0}));
  };

  render() {
    const { sortBy, currentPage } = this.state;
    const { data: movies = [], total } = this.props.movies;
    const { pageCount } = this.props;
    const isShouldPaginationShow = movies.length && total > MAX_LIMIT_MOVIES;

    return (
      <Fragment>
        <ContentHeaderWrapper>
          <div className="content__header-result"><span>{total}</span> movies found</div>
          <div className="content__header-sort">
            <p>Sort by</p>
            <RadioButton
              name="sort"
              id="release"
              value="release_date"
              text="release date"
              onChange={this.onChangeSortBy}
              isChecked={sortBy === 'release_date'}
            />
            <RadioButton
              name="sort"
              id="rating"
              value="vote_average"
              text="rating"
              onChange={this.onChangeSortBy}
              isChecked={sortBy === 'vote_average'}
            />
          </div>
        </ContentHeaderWrapper>
        <div className="content">
          <FilmsList />
          { isShouldPaginationShow ? <Pagination
            forcePage={currentPage}
            onPageChange={this.onPageChange}
            pageCount={pageCount}
          /> : null }
        </div>
      </Fragment>
    );
  }
}

PropTypes.defaultProps = {
  movies: [],
};

PropTypes.propTypes = {
  movies: PropTypes.array,
};

export const mapStateToProps = ({ movies, searchingParameters }) => {
  let displayedMovies = null;

  if(movies.offset >= movies.data.length) {
    displayedMovies = slice(movies.data, movies.data.length - movies.limit, movies.data.length);
  } else {
    displayedMovies = slice(movies.data, movies.offset, movies.offset + movies.limit);
  }

  return {
    movies: Object.assign({}, movies, { data: displayedMovies }),
    searchingParameters,
    pageCount: Math.ceil(movies.total / movies.limit),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  searchMovies:              payload => searchMovies(dispatch, payload),
  clearMovies:               payload => clearMovies(dispatch, payload),
  sortByRating:              payload => sortByRating(dispatch, null),
  sortByReleaseDate:         payload => sortByReleaseDate(dispatch, null),
  updateSortByValue:         payload => updateSortByValue(dispatch, payload),
  updateSearchingParameters: payload => updateSearchingParameters(dispatch, payload),
});

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainContent);