# frozen_string_literal: true

module Api
  module V1
    class HomeController < ApplicationController
      def index
        render json: { result: 'success', message: I18n.t('hello') }
      end
    end
  end
end
