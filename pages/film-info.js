// ./pages/film-info.js
import React, { Component } from 'react';
import Link from 'next/link';

import 'babel-polyfill';

import './index.scss';

import { makeStore } from '../utils/create-store.util';
import withRedux from 'next-redux-wrapper';
import { HeaderWrapper } from '../components/header.component';
import { HeaderTitle } from '../components/header-title.component';
import { searchMovie } from '../actions/movie.action';
import { clearMovies, searchMovies } from '../actions/movies.action';
import { Page } from './decorators/page.decorator';
import { Wrapper } from '../components/wrapper.component';
import { ContentHeaderWrapper } from '../components/content-header-wrapper.component';
import FilmsList from '../components/films-list.component';
import { Pagination } from '../components/pagination.component';
import {
  MAX_LIMIT_MOVIES,
  DEFAULT_SORT_BY,
  DEFAULT_OFFSET,
  DEFAULT_SORT_ORDER,
} from '../constants/values.constants';
import { updateSearchingParameters } from '../actions/searching-parameters.action';

import '../components/pagination.scss';

const DEFAULT_SEARCH_BY = 'genres';

export class FilmInfo extends Component {
  state = {
    currentPage: 0,
  };

  componentWillUnmount() {
    const { clearMovies } = this.props;

    clearMovies();
  }

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

  componentWillMount() {
    const { clearMovies, searchMovies, updateSearchingParameters } = this.props;
    const search = this.props.movie.genres[0];
    const payload = {
      search,
      searchBy:  DEFAULT_SEARCH_BY,
      offset:    DEFAULT_OFFSET,
      limit:     MAX_LIMIT_MOVIES,
      sortBy:    DEFAULT_SORT_BY,
      sortOrder: DEFAULT_SORT_ORDER,
    };

    clearMovies();
    searchMovies(payload);
    updateSearchingParameters(payload);
  }

  render() {
    const { 
      poster_path: posterPath,
      title,
      tagline,
      vote_average: voteAverage,
      release_date: releaseDate,
      overview,
      genres,
      runtime,
    } = this.props.movie;
    const { total, pageCount } = this.props;  
    const { data: movies = [] } = this.props.movies;
    const { currentPage } = this.state;
    const isShouldPaginationShow = movies.length && total > MAX_LIMIT_MOVIES;

    return (
      <Page>
        <Wrapper>
          <HeaderWrapper>
            <HeaderTitle>
              <Link href="/">
                <a>Search</a>
              </Link>
            </HeaderTitle>
            <div className="film-info__content">
              <img className="film-info__img" src={`${posterPath}`} />
              <div className="film-info__data">
                <div>
                <div className="film-info__name_and_rating">
                  <h2>{title}</h2>
                  <span className="vote_average">{voteAverage}</span>
                </div>
                <p className="tagline">{tagline}</p>
                <div className="film-info__year_and_time">
                  <span className="year">{releaseDate}</span>
                  <span className="time">{runtime} min</span>
                </div>
                <div className="overview">{overview}</div>
                <p className="director">Director: Quentin Tarantino</p>
                <p className="cast">Cast: Jonh Travota, Samuel L. Jacson, Jonh Travota, Samuel L. Jacson, Jonh Travota, Samuel L. Jacson, Jonh Travota, Samuel L. Jacson</p>
                </div>
              </div>
            </div>
          </HeaderWrapper>
          <ContentHeaderWrapper>
            <div className="content__header-result">Similar by {genres[0].toLowerCase()}</div>
          </ContentHeaderWrapper>
          <div className="content">
            <FilmsList />
            { isShouldPaginationShow ? <Pagination
              forcePage={currentPage}
              onPageChange={this.onPageChange}
              pageCount={pageCount}
            /> : null }
          </div>
        </Wrapper>
      </Page>
    );
  }
}

FilmInfo.getInitialProps = async ({ store, isServer, pathname, query }) => {
  await searchMovie(store.dispatch, query);

  return { isServer };
};

export const mapStateToProps = ({ movie, movies, searchingParameters }) => ({
  movie,
  total: movies.total,
  movies,
  pageCount: Math.ceil(movies.total / movies.limit),
  searchingParameters,
});

export const mapDispatchToProps = (dispatch) => ({
  clearMovies:               payload => clearMovies(dispatch, null),
  searchMovies:              payload => searchMovies(dispatch, payload),
  updateSearchingParameters: payload => updateSearchingParameters(dispatch, payload),
});

export default withRedux(
  makeStore, 
  mapStateToProps,
  mapDispatchToProps,
)(FilmInfo);
