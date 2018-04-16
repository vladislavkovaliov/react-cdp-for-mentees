import { isValueInputValue } from '../is-valid-input-value.util';

describe('[is-valid-input-value.util.js]', () => {
  test('should return true if value is more than 3 letter', () => {
    expect(isValueInputValue('morethan3letter')).toBe(true);
  });

  test('should return true if value is less than 3 letter', () => {
    expect(isValueInputValue('t')).toBe(false);
  });
});