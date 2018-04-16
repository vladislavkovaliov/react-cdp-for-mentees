import { MAX_LENGTH_INPUT_VALUE } from '../constants/values.constants';

export function isValueInputValue(value) {
  return value.length > MAX_LENGTH_INPUT_VALUE;
}