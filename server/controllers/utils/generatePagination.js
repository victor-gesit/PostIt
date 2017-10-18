export default (offset, limit, count, allLoaded, done) => {
  offset = Number(offset);
  const totalPages = Math.ceil(count / limit);
  const isLastPage = allLoaded === count;
  const currentPage = Math.ceil(offset / limit) + 1;
  done(
    {
      indexOfLast: allLoaded,
      total: count,
      totalPages,
      isLastPage,
      currentPage,
      offset
    }
  );
};
