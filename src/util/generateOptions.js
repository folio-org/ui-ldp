export default function generateOptions(startFrom, count) {
  return Array(count)
    .fill()
    .map((_val, index) => 10 ** (index + startFrom))
    .map(val => ({ value: val, label: val }));
}
