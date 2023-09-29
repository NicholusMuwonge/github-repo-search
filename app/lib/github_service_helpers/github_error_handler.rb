# frozen_string_literal: true

module GithubServiceHelpers
  class GithubErrorHandler
    def initialize(error)
      @error = error
    end

    def handle
      Struct.new(success?: false, response_code: nil, response_body: @error.message)
    end
  end
end
