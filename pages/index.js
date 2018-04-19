// ./pages/index.js
import React, { Component } from 'react';

import { Header } from './sections/header';
import { Main } from './sections/main';

import { makeStore } from '../utils/create-store.util';
import withRedux from "next-redux-wrapper";

import { Page } from './decorators/page.decorator';
import { Wrapper } from '../components/wrapper.component';
import { updateSearchingParameters } from '../actions/searching-parameters.action';
import { searchMovies, clearMovies } from '../actions/movies.action';
import {
  MAX_LIMIT_MOVIES,
  DEFAULT_SORT_BY,
  DEFAULT_SEARCH_BY,
  DEFAULT_OFFSET,
  DEFAULT_SORT_ORDER,
} from '../constants/values.constants';

import 'babel-polyfill';

import isEmpty from 'lodash/isEmpty';

import './index.scss';

export class App extends Component {
  render() {
    return (
      <Page>
        <Wrapper>
          <Header />
          <Main />
        </Wrapper>
      </Page>
    );
  }
}

App.getInitialProps = async ({ store, isServer, pathname, query }) => {
  if(isEmpty(query) !== true) {
    const {
      search,
      searchBy  = DEFAULT_SEARCH_BY,
      sortBy    = DEFAULT_SORT_BY,
      sortOrder = DEFAULT_SORT_ORDER,
    } = query;

    const payload = {
      search,
      searchBy,
      sortBy,
      sortOrder,
      limit:  MAX_LIMIT_MOVIES,
      offset: DEFAULT_OFFSET,
    };

    await clearMovies(store.dispatch);
    await updateSearchingParameters(store.dispatch, payload);
    await searchMovies(store.dispatch, payload);
  }

  return { isServer };
};

export const mapStateToProps = ({ movies, searchingParameters }) => ({
  movies: {
    data: movies.data,
    total: movies.total,
  },
  searchingParameters,
  pageCount: Math.ceil(movies.total / movies.limit),
});

export const mapDispatchToProps = (dispatch) => ({
  updateSearchingParameters: payload => updateSearchingParameters(dispatch, payload),
  searchMovies:              payload => searchMovies(dispatch, payload),
});

export default withRedux(
  makeStore,
  mapStateToProps,
  mapDispatchToProps
)(App);


