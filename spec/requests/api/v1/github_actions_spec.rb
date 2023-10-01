# frozen_string_literal: true

require 'swagger_helper'

describe 'Github API calls' do
  path '/api/v1/github_repo_search' do
    get 'Makes a search call to github api and returns search results.' do
      tags 'RepositorySearch'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :q, in: :query, type: :string, required: true, pattern: '^[a-zA-Z0-9].*', minLength: 1
      parameter name: :per_page, in: :query, type: :integer, default: 10, required: false
      parameter name: :page, in: :query, type: :integer, default: 1, required: false
      parameter name: :sort, in: :query, type: :string, enum: %w[stars forks help-wanted-issues updated],
                description: 'Sort order: Options(stars, forks, help-wanted-issues, updated)', required: false
      parameter name: :order, in: :query, type: :string, enum: %w[asc desc],
                description: 'Sort direction: Options(asc, desc)', required: false

      response '200', 'search results returned' do
        let(:q) { 'your_search_query_here' }
        run_test!
      end

      response '400', 'bad request' do
        let(:q) { '' }
        let(:order) { 'invalid' }
        let(:sort) { 'invalid' }
        let(:page) { 0 }
        let(:per_page) { 30 }

        run_test! do |response|
          data = JSON.parse(response.body)

          expect(data['result']).to eq('error')
          # expect(data['errors']['q']).to eq(['should start with an alphanumeric character',
          #                                    'should have at least one character'])
          # expect(data['errors']['order']).to eq([
          #                                         'must be one of: asc, desc'
          #                                       ])
          # expect(data['errors']['per_page']).to eq([
          #                                            'must be one of: 5 - 20'
          #                                          ])
          # expect(data['errors']['sort']).to eq([
          #                                        'must be one of: stars, forks, help-wanted-issues, updated'
          #                                      ])
        end
      end
    end
  end
end
