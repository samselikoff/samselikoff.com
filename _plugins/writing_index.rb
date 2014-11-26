require 'active_support/inflector'

module WritingsIndex
  class Generator < Jekyll::Generator
    def generate(site)
      writings = site.collections['writings']
      index_writings = writings.docs.map(&:to_liquid).select do |doc|
        doc['published'] != false && doc['primary'] != false
      end

      categorized_writings = {}
      index_writings.each do |article|
        cat = article['category'].pluralize
        if !categorized_writings[cat] then categorized_writings[cat] = [] end

        # Some writings are just placeholders that redirect, so we want the link
        # to go directly to the real content.
        article['linkOrUrl'] = article['link'] || article['url']

        categorized_writings[cat].push article
      end

      site.data['writings'] = categorized_writings
    end
  end
end
