# frozen_string_literal: true

module GithubServiceHelpers
  class GithubResponseHandler
    def initialize(response)
      @response = response
    end

    def handle
      status = @response.status
      body = @response.body
      if status == 200
        OpenStruct.new(success?: true, response_code: status, response_body: JSON.parse(body))
      else
        OpenStruct.new(success?: false, response_code: status, response_body: body)
      end
    end
  end
end
