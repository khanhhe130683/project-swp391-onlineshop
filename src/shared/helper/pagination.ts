function pagination(page, pageSize) {
  const limit = pageSize && pageSize > 0 ? Number(pageSize) : 10;
  const skip = page && page > 0 ? (page - 1) * limit : 0;
  return { limit, skip };
}

export default pagination;
