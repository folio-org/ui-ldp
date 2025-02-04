function sortByParams(data, sortedColumn, sortDirection) {
  return (data || []).sort((a, b) => {
    const av = a[sortedColumn];
    const bv = b[sortedColumn];

    if (av < bv) {
      return (sortDirection === 'ascending' ? -1 : 1);
    } else if (av > bv) {
      return (sortDirection === 'ascending' ? 1 : -1);
    } else {
      return 0;
    }
  });
}


export default sortByParams;
