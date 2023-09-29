# frozen_string_literal: true

module GithubServices
  class RepositorySearch
    def initialize(query_params)
      @query_params = query_params
    end

    def call
      response = perform_request
      handle_response(response)
    rescue Faraday::Error, StandardError => e
      handle_error(e)
    end

    private

    def perform_request
      url = build_url
      headers = build_headers
      Faraday.get(url, nil, headers)
    end

    def build_url
      GithubServiceHelpers::GithubApiUrlBuilder.new(@query_params).build
    end

    def build_headers
      GithubServiceHelpers::GithubApiHeadersBuilder.build
    end

    def handle_response(response)
      GithubServiceHelpers::GithubResponseHandler.new(response).handle
    end

    def handle_error(error)
      GithubServiceHelpers::GithubErrorHandler.new(error).handle
    end
  end
end
