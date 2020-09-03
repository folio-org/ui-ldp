
// Call function n times (From underscore.js)
export const times = (n, iteratee) => {
  var accum = Array(Math.max(0, n));
  for (var i = 0; i < n; i++) accum[i] = iteratee(i);
  return accum;
}
