import { sortByReleaseDate } from '../sort-by-release-date.util';

const unsorted = [
  { release_date: '2016-12-12' },
  { release_date: '2013-12-12' },
  { release_date: '2014-12-16' },
  { release_date: '2017-12-12' },
  { release_date: '2016-09-09' },
  { release_date: '2000-12-12' },
];

const sorted = [
  { release_date: '2017-12-12' },
  { release_date: '2016-12-12' },
  { release_date: '2016-09-09' },
  { release_date: '2014-12-16' },
  { release_date: '2013-12-12' },
  { release_date: '2000-12-12' },
];

describe('[sort-by-release-date.util.js]', () => {
  test('should return sorted by release date', () => {
     expect(unsorted.sort(sortByReleaseDate)).toEqual(sorted);
  });
});