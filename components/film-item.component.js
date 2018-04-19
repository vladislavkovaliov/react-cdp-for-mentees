import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import { parseReleaseDate } from '../utils/parse-release-date.util';

import './film-item.scss';

export function FilmItem({
  id,
  posterPath,
  genres,
  releaseDate,
  voteAverage,
  title }) {
  return (
    <Fragment>
      <div className="film-item">
        <span className="rating">{voteAverage}</span>
        <div
          style={{ backgroundImage: `url(${posterPath})` }}
          className="film-item__img">
        </div>
        <div className="film-item__footer">
          <div className="film-item__footer-desc">
            <Link href={{ pathname: '/film-info', query: { id } }}><p>{title}</p></Link>
            <span>{parseReleaseDate(releaseDate)}</span>
          </div>
          <div className="film-item__footer-gender">{genres.join(' & ')}</div>
        </div>
      </div>
    </Fragment>
  );
}

FilmItem.propTypes = {
  id: PropTypes.number.isRequired,
  posterPath: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  releaseDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
};
