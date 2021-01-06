export const Median = function(arr) {
  const len = arr.length;

  if (!len) { return; }

  const arrSort = arr.sort();
  const mid = Math.ceil(len / 2);
  const median = len % 2 == 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];

  return Math.ceil(median);
}

export const getIntegerOf = function(value) {
  return parseInt(value) || 0;
}
