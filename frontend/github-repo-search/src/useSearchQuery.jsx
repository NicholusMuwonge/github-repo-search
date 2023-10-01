import { githubRepoSearch } from './service'
import { useQuery } from '@tanstack/react-query'


const numberOfPages = (data, per_page) => {
  if(!data) return ({pagesCount: 0, pages: []});
  let pagesCount = 0
  if (data) {
    const resultCount = data?.search_results?.total_count
    if (resultCount && resultCount > 1000) {
      pagesCount = Math.ceil(1000 / per_page)
    }
    if (resultCount && resultCount < 1000) {
      pagesCount = Math.ceil(resultCount / per_page)
    }
  }
  return ({
    pagesCount,
    pages:  Array.from({ length: pagesCount }, (_, index) => index + 1)
  })
}
export const useSearchQuery = (queryParams) => {
  const { status, data, error, isLoading, refetch, fetchStatus } = useQuery({
    queryKey: [
      'repos',
      queryParams.query,
      queryParams.page,
      queryParams.per_page,
      queryParams.sort,
      queryParams.order,
    ],
    queryFn: async () => await githubRepoSearch(queryParams),
    keepPreviousData: true,
    staleTime: 5000,
    enabled: false,
  })

  return {
    pagesData: numberOfPages(data, queryParams.per_page),
    status,
    data,
    error,
    isLoading,
    fetchStatus,
    refetch,
  }
}
