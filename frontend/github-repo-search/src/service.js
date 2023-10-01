const BASEURL = `${import.meta.env.VITE_HOST}/api/v1`;

/**
 * Perform a GitHub repository search.
 * @param {Object} options - Search options.
 * @param {string} options.query - The search query.
 * @param {number} [options.page=1] - The page number.
 * @param {number} [options.per_page=10] - Number of items per page.
 * @param {string} [options.sort] - Sorting criteria (optional).
 * @param {string} [options.order] - Sorting order (optional).
 * @returns {Promise<Object>} - The search results.
 * @throws {Error} - If the request fails or required parameters are missing.
 */

export const githubRepoSearch = async ({ query, page = 1, per_page = 10, sort, order }) => {
  if (!query) {
    throw new Error('Query parameter is required.');
  }

  const sortParams = ['stars', 'forks', 'help-wanted-issues', 'updated'].includes(sort) ? `&sort=${sort}` : '';
  const orderParams = ['asc', 'desc'].includes(order) ? `&order=${order}` : '';

  const url = `${BASEURL}/github_repo_search?q=${query}&page=${page}&per_page=${per_page}${sortParams}${orderParams}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in githubRepoSearch: ${error.message}`);
  }
};
