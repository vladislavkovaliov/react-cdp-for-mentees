export function sortByRating(itemA, itemB) {
  return parseInt(itemB['vote_average'], 10) - parseInt(itemA['vote_average'], 10);
}
