// ./pages/index.js
import React, { Component, Fragment } from 'react';

import { Header } from './sections/header';
import { Main } from './sections/main';

import { makeStore } from '../utils/create-store.util';
import withRedux from "next-redux-wrapper";

import { Page } from './decorators/page.decorator';
import { Wrapper } from '../components/wrapper.component';
import { updateSearchingParameters } from '../actions/searching-parameters.action';
import { searchMovies } from '../actions/movies.action';

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
  searchMovies: payload => searchMovies(dispatch, payload),
});

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(App);


