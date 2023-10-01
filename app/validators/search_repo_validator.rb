# frozen_string_literal: true

class SearchRepoValidator < Dry::Validation::Contract
  params do
    optional(:page).value(:integer, gteq?: 1)
    optional(:per_page).filled(:integer, included_in?: 5..20)
    required(:q).value(:string)
    optional(:order).filled(included_in?: %w[asc desc])
    optional(:sort).filled(included_in?: %w[stars forks help-wanted-issues updated])
  end

  rule(:q) do
    key.failure('should start with an alphanumeric character') unless value =~ /\A[a-zA-Z0-9]/
    key.failure('should have at least one character') if value.empty?
  end
end
