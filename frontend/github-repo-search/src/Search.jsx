import { useEffect, useState, lazy, Suspense } from 'react'
import { Input, Skeleton } from 'antd'
import { useSearchQuery } from './useSearchQuery'
import { useSorter } from './SortOptions'
const { Search: SearchBox } = Input

const RepoDisplaySection = lazy(() => import('./RepoTile'))
const SortInfoSection = lazy(() => import('./SortOptions'))
const PaginationTile = lazy(() => import('./Pagination'))

const styles = {
  container: {
    width: '80%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '5%',
  },
  searchBarStyle: { width: '80%' },
}

/**
 * useSearch Hook
 *
 * A custom React hook for managing search-related state and actions.
 *
 * @returns {Object} An object containing search-related state and functions.
 * @property {string} searchQuery - The current search query.
 * @property {Function} setSearchQuery - Function to set the search query.
 * @property {number} page - The current page number.
 * @property {Function} setPage - Function to set the current page.
 * @property {number} perPage - The number of items per page.
 * @property {Function} setPerPage - Function to set items per page.
 * @property {Object} sortMethod - The current sorting method.
 * @property {Function} handleSortValueChange - Function to handle sorting changes.
 * @property {string} status - The status of the search query (e.g., 'loading', 'error').
 * @property {Object} data - The search query result data.
 * @property {string} fetchStatus - The status of the data fetch (e.g., 'fetching', 'success').
 * @property {Function} refetch - Function to manually refetch the search query.
 * @property {Function} handleSubmit - Function to handle form submission.
 */

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { sortMethod, handleSortValueChange } = useSorter()

  const { status, data, fetchStatus, refetch } = useSearchQuery({
    query: searchQuery,
    page: page,
    per_page: perPage,
    sort: sortMethod.sort?.key,
    order: sortMethod.order?.key,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    refetch()
    setPage(1)
  }

  useEffect(() => {
    searchQuery && refetch()
  }, [page, perPage, sortMethod])

  useEffect(() => {
    setPage(1)
  }, [sortMethod])

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    perPage,
    setPerPage,
    sortMethod,
    handleSortValueChange,
    status,
    data,
    fetchStatus,
    refetch,
    handleSubmit,
  }
}

/**
 * Search Component
 *
 * @component
 * @returns {React.Component} The rendered Search component.
 */

export const Search = () => {
  const {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    perPage,
    setPerPage,
    sortMethod,
    handleSortValueChange,
    status,
    data,
    fetchStatus,
    refetch,
    handleSubmit,
  } = useSearch()
  return (
    <div style={styles.container}>
      <SearchBox
        placeholder="Search For Github Repositories "
        enterButton="Search"
        size="large"
        allowClear
        loading={fetchStatus === 'fetching' && status === 'loading'}
        disabled={fetchStatus === 'fetching' && status === 'loading'}
        style={styles.searchBarStyle}
        onChange={(event) => setSearchQuery(event.target.value)}
        onSearch={(value, e) => handleSubmit(e)}
      />
      {data && searchQuery ? (
        <Suspense fallback={<Skeleton active />}>
          <SortInfoSection
            handleSortValueChange={handleSortValueChange}
            searchData={data}
            sortMethod={sortMethod}
          />
        </Suspense>
      ) : null}
      <Suspense
        fallback={
          <div>
            <Skeleton active />
          </div>
        }
      >
        <RepoDisplaySection
          data={data}
          loading={fetchStatus === 'fetching' && status === 'loading'}
          searchQuery={searchQuery}
        />
      </Suspense>
      <Suspense
        fallback={
          <div>
            <Skeleton active />
          </div>
        }
      >
        <PaginationTile
          searchData={data}
          searchQuery={searchQuery}
          setPage={setPage}
          setPerPage={setPerPage}
          refetch={refetch}
          perPage={perPage}
          page={page}
          key={page}
        />
      </Suspense>
    </div>
  )
}
