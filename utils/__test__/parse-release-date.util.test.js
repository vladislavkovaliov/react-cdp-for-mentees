import { parseReleaseDate } from '../parse-release-date.util';

describe('[parse-release-date.util.js]', () => {
  test('should return only year from release date', () => {
    expect(parseReleaseDate('2017-12-12')).toBe('2017');
  });
});