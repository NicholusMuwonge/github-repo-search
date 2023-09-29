# frozen_string_literal: true

module GithubServiceHelpers
  class GithubApiUrlBuilder
    GITHUB_API_SORT_OPTIONS = %w[stars forks help-wanted-issues updated].freeze
    GITHUB_API_ORDER_OPTIONS = %w[asc desc].freeze
    GITHUB_API_URL = 'https://api.github.com/search/repositories'

    def initialize(query_params)
      @query_params = query_params
    end

    def build
      validate_sort_and_order_options
      encoded_query = URI.encode_www_form(@query_params)
      "#{GITHUB_API_URL}?#{encoded_query}"
    end

    private

    def validate_sort_and_order_options
      if @query_params[:sort].present? && !GITHUB_API_SORT_OPTIONS.include?(@query_params[:sort])
        raise ArgumentError, "Invalid sort option. Valid options are: #{GITHUB_API_SORT_OPTIONS.join(', ')}"
      end

      return unless @query_params[:order].present? && !GITHUB_API_ORDER_OPTIONS.include?(@query_params[:order])

      raise ArgumentError, "Invalid order option. Valid options are: #{GITHUB_API_ORDER_OPTIONS.join(', ')}"
    end
  end
end
