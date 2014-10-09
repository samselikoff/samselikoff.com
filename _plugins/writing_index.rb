require 'active_support/inflector'

module WritingIndex
  class Generator < Jekyll::Generator
    def generate(site)
      writing = site.collections['writing']
      index_writing = writing.docs.map(&:to_liquid).select do |doc|
        doc['published'] != false && doc['primary'] != false
      end

      categorized_writing = {}
      index_writing.each do |article|
        cat = article['category'].pluralize
        if !categorized_writing[cat] then categorized_writing[cat] = [] end

        categorized_writing[cat].push article
      end

      site.data['writing'] = categorized_writing
    end
  end
end
