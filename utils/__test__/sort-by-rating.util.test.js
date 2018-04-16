import { sortByRating } from '../sort-by-rating.util';

const unsorted = [
  { vote_average: 1 },
  { vote_average: 5.7 },
  { vote_average: 2.5 },
  { vote_average: 1 },
  { vote_average: 9.0 },
  { vote_average: 2.4 },
  { vote_average: 6 },
  { vote_average: 3.3 },
];

const sorted = [
  { vote_average: 9.0 },
  { vote_average: 6 },
  { vote_average: 5.7 },
  { vote_average: 3.3 },
  { vote_average: 2.5 },
  { vote_average: 2.4 },
  { vote_average: 1 },
  { vote_average: 1 },
];

describe('[sort-by-rating.util.js]', () => {
  test('should return sorted by rating', () => {
     expect(unsorted.sort(sortByRating)).toEqual(sorted);
  });
});