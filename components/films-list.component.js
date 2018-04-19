import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import { makeStore } from '../utils/create-store.util';
import withRedux from 'next-redux-wrapper';

import { FilmItem } from './film-item.component';

import slice from 'lodash/slice';

export class FilmsList extends Component {
  render() {
    const { data: movies = [] } = this.props.movies;

    return (
      <div className="films-list">
        {
          movies.length ?
            movies.map(movie => (
              <FilmItem
                id={movie.id}
                key={movie.id}
                voteAverage={movie.vote_average}
                posterPath={movie.poster_path}
                genres={movie.genres}
                releaseDate={movie.release_date}
                title={movie.title}
              />
            )) : <div style={{ textAlign: "center", width: "100%" }}>No result</div>
        }
      </div>
    );
  }
}

export const mapStateToProps = ({ movies }) => {
  let displayedMovies = movies.offset >= movies.data.length ?
    slice(movies.data, movies.data.length - movies.limit, movies.data.length) : 
    slice(movies.data, movies.offset, movies.offset + movies.limit);

  return {
    movies: Object.assign({}, movies, { data: displayedMovies }),
  };
};

export const mapDispatchToProps = (dispatch) => ({});

export default withRedux(
  makeStore,
  mapStateToProps,
  mapDispatchToProps,
)(FilmsList);
