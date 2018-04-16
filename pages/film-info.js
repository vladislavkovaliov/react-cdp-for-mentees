// ./pages/film-info.js
import React, { Component, Fragment } from 'react';
import Link from 'next/link';

import 'babel-polyfill';

import './index.scss';

import { makeStore } from '../utils/create-store.util';
import withRedux from 'next-redux-wrapper';
import { HeaderWrapper } from '../components/header.component';
import { HeaderTitle } from '../components/header-title.component';
import { searchMovie } from '../actions/movie.action';
import { Page } from './decorators/page.decorator';
import { Wrapper } from '../components/wrapper.component';
import { ContentHeaderWrapper } from '../components/content-header-wrapper.component';

export class FilmInfo extends Component {
  render() {
    const { 
      poster_path: posterPath,
      title,
      tagline,
      vote_average: voteAverage,
      release_date: releaseDate,
      overview
    } = this.props.movie;

    return (
      <Page>
        <Wrapper>
          <HeaderWrapper>
            <HeaderTitle>
              <Link href="/"><a>Back</a></Link>
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
                  <span className="time">154 min</span>
                </div>
                <div className="overview">{overview}</div>
                <p className="director">Director: Quentin Tarantino</p>
                <p className="cast">Cast: Jonh Travota, Samuel L. Jacson, Jonh Travota, Samuel L. Jacson, Jonh Travota, Samuel L. Jacson, Jonh Travota, Samuel L. Jacson</p>
                </div>
              </div>
            </div>
          </HeaderWrapper>
          <ContentHeaderWrapper>

          </ContentHeaderWrapper>
        </Wrapper>
      </Page>
    );
  }
}

FilmInfo.getInitialProps = async ({ store, isServer, pathname, query }) => {
  await searchMovie(store.dispatch, query);

  return { isServer };
};

export default withRedux(makeStore, (state) => {
  return { movie: state.movie };
})(FilmInfo);
