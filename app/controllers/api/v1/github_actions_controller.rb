# frozen_string_literal: true

module Api
  module V1
    class GithubActionsController < ApplicationController
      def search_repositories
        validated_params = validate_search_params(search_query_params)
        search_results = perform_repository_search(validated_params)
        handle_search_results(search_results)
      rescue Exceptions::InvalidApiParameters => e
        render_error_response(e.validation_result)
      end

      private

      def perform_repository_search(params)
        GithubServices::RepositorySearch.new(params.to_h).call
      end

      def handle_search_results(response)
        if response.success?
          render json: { result: 'success', search_results: response.response_body }
        else
          render json: { result: 'failure', error: response.response_body }, status: :unprocessable_entity
        end
      end

      def validate_search_params(params)
        validation_result = SearchRepoValidator.new.call(params.to_h)
        raise Exceptions::InvalidApiParameters, validation_result unless validation_result.success?

        validation_result
      end

      def search_query_params
        params.permit(:q, :sort, :order, :per_page, :page).reverse_merge(per_page: 10)
      end
    end
  end
end
