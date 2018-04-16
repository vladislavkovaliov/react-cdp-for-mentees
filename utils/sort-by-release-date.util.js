export function sortByReleaseDate(itemA, itemB) {
  return itemB['release_date'].split('-')[0] - itemA['release_date'].split('-')[0];
}
