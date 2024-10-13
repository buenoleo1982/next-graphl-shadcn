export const pageArgs = (totalCount: number, skip: number, take: number) => {
  return {
    totalCount,
    page: Math.floor(skip / take) + 1,
    pageSize: take,
    hasMore: skip + take < totalCount
  }
}
