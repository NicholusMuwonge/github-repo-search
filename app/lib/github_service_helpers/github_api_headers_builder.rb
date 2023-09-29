# frozen_string_literal: true

module GithubServiceHelpers
  class GithubApiHeadersBuilder
    def self.build
      {
        'Content-Type' => 'application/json',
        'Accept' => 'application/vnd.github+json',
        'Authorization' => "Bearer #{Rails.application.credentials.dig(:github_secrets, :auth_token)}"
      }
    end
  end
end
