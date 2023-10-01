# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GithubServiceHelpers::GithubApiUrlBuilder do
  describe '#build' do
    it 'builds the correct URL' do
      query_params = { q: 'rails', sort: 'stars', order: 'desc' }
      url_builder = described_class.new(query_params)

      expected_url = 'https://api.github.com/search/repositories?q=rails&sort=stars&order=desc'
      built_url = url_builder.build

      expect(built_url).to eq(expected_url)
    end

    it 'raises ArgumentError for invalid sort option' do
      query_params = { q: 'rails', sort: 'invalid', order: 'desc' }
      url_builder = described_class.new(query_params)

      expect do
        url_builder.build
      end.to raise_error(ArgumentError,
                         'Invalid sort option. Valid options are: stars, forks, help-wanted-issues, updated')
    end

    it 'raises ArgumentError for invalid order option' do
      query_params = { q: 'rails', sort: 'stars', order: 'invalid' }
      url_builder = described_class.new(query_params)

      expect { url_builder.build }.to raise_error(ArgumentError, 'Invalid order option. Valid options are: asc, desc')
    end
  end
end
