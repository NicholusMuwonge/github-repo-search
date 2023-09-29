# frozen_string_literal: true

class SearchRepoValidator < Dry::Validation::Contract
  params do
    optional(:page).value(gteq?: 1)
    optional(:per_page).filled(:int?, included_in?: 10..30)
    required(:q).value(:string, min_size?: 1)
    optional(:order).filled(included_in?: %w[asc desc])
    optional(:sort).filled(included_in?: %w[stars forks help-wanted-issues updated])
  end
end
