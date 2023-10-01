# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GithubServiceHelpers::GithubApiHeadersBuilder do
  describe '.build' do
    it 'builds the correct headers' do
      expected_headers = {
        'Content-Type' => 'application/json',
        'Accept' => 'application/vnd.github+json',
        'Authorization' => "Bearer #{Rails.application.credentials.dig(:github_secrets, :auth_token)}"
      }

      headers = described_class.build

      expect(headers).to eq(expected_headers)
    end
  end
end
