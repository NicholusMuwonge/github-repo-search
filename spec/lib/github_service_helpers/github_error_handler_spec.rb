# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GithubServiceHelpers::GithubErrorHandler do
  describe '#handle' do
    it 'returns an OpenStruct with failure information' do
      error_message = 'Something went wrong'
      error = StandardError.new(error_message)
      error_handler = described_class.new(error)

      result = error_handler.handle

      expect(result.success?).to be(false)
      expect(result.response_code).to be_nil
      expect(result.response_body).to eq(error_message)
    end
  end
end
