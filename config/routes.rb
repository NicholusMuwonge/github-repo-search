# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")

  namespace :api do
    namespace :v1 do
      root 'home#index'
      get '/github_repo_search', to: 'github_actions#search_repositories'
    end
  end
end
