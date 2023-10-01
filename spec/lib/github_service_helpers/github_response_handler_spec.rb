# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GithubServiceHelpers::GithubResponseHandler do
  describe '#handle' do
    it 'returns a Hash with success information for a 200 status' do
      response = instance_double(Faraday::Response, status: 200, body: '{"result": "success",
        "search_results": {
            "total_count": 0,
            "incomplete_results": false,
            "items": []}}')
      response_handler = described_class.new(response)

      result = response_handler.handle

      expect(result.success?).to be(true)
      expect(result.response_code).to eq(200)
      expect(result.response_body).to eq({ 'result' => 'success',
                                           'search_results' => { 'incomplete_results' => false, 'items' => [],
                                                                 'total_count' => 0 } })
    end

    it 'returns an OpenStruct with failure information for a non-200 status' do
      response = instance_double(Faraday::Response, status: 404, body: 'Not Found')
      response_handler = described_class.new(response)

      result = response_handler.handle

      expect(result.success?).to be(false)
      expect(result.response_code).to eq(404)
      expect(result.response_body).to eq('Not Found')
    end
  end
end
