# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::GithubActionsController, type: :controller do
  describe 'GET #search_repositories' do
    it 'returns success with valid params' do
      allow_any_instance_of(GithubServices::RepositorySearch).to receive(:call).and_return(
        OpenStruct.new(success?: true, response_body: { items: [], total_count: 0, incomplete_results: false })
      )

      get :search_repositories, params: { q: 'rails' }

      parsed_response = JSON.parse(response.body)
      expect(response).to have_http_status(:success)
      expect(parsed_response['result']).to eq('success')
      expect(parsed_response['search_results']).to be_a(Hash)
      expect(parsed_response['search_results']['total_count']).to be_a(Integer).and be >= 0
    end

    it 'returns failure with invalid params' do
      get :search_repositories, params: { q: '', sort: 'name', order: 'ascending', page: 0, per_page: 2 }

      parsed_response = JSON.parse(response.body)

      expect(response).to have_http_status(:bad_request)
      expect(parsed_response['result']).to eq('error')
      expect(parsed_response['errors']).to be_a(Hash)
    end

    it 'returns error when params are missing' do
      get :search_repositories

      expect(response).to have_http_status(:bad_request)

      parsed_response = JSON.parse(response.body)

      expect(parsed_response['result']).to eq('error')
      expect(parsed_response['errors']).to be_a(Hash)
      expect(parsed_response['errors']['q']).to eq(['is missing'])
    end
  end
end
