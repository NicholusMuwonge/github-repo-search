import { Pagination } from 'antd'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_RESULT_COUNT,
  PAGE_SIZE_OPTIONS,
} from './Constants'

const styles = {
  paginationStyle: { marginTop: '2%' },
}

/**
 * Component for rendering pagination controls.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.searchData - Data from the search results.
 * @param {string} props.searchQuery - The current search query.
 * @param {Function} props.setPage - Function to set the current page.
 * @param {Function} props.setPerPage - Function to set the number of items per page.
 * @param {Function} props.refetch - Function to refetch search results.
 * @param {number} props.perPage - The current number of items per page.
 * @param {number} props.page - The current page number.
 * @returns {JSX.Element|null} - The rendered Pagination component or null if no search results.
 */

const PaginationTile = ({
  searchData,
  searchQuery,
  setPage,
  setPerPage,
  refetch,
  perPage,
  page,
}) => {
  /**
   * Handler for changing the number of items per page.
   *
   * @param {number} currSize - The current size of the page.
   * @param {number} newPageSize - The new size of the page.
   */
  const onShowSizeChange = (currSize, newPageSize) => {
    setPerPage(newPageSize)
    currSize !== newPageSize && refetch()
  }

  /**
   * Handler for changing the current page.
   *
   * @param {number} pageNumber - The new page number.
   * @param {number} pageSize - The number of items per page.
   */
  const onPageChange = (pageNumber, pageSize) => {
    setPage(pageNumber)
    setPerPage(pageSize)
    refetch()
  }
  if (!(searchData?.search_results?.total_count && searchQuery)) return null
  return (
    <Pagination
      showQuickJumper
      style={styles.paginationStyle}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      responsive
      pageSize={perPage}
      defaultCurrent={DEFAULT_PAGE}
      defaultPageSize={DEFAULT_PAGE_SIZE}
      current={page}
      total={Math.min(
        searchData?.search_results?.total_count,
        MAX_RESULT_COUNT,
      )}
      onChange={onPageChange}
      onShowSizeChange={onShowSizeChange}
    />
  )
}

export default PaginationTile
