module PostsAndEvents
  class Generator < Jekyll::Generator
    def generate(site)
      posts_hashes = site.posts.map(&:to_liquid).each{ |post| post['type'] = 'post'}
      posts_and_events = posts_hashes.concat site.data['events']

      site.data['posts_and_events'] = posts_and_events.sort_by{ |item| item['date'] }.reverse
    end
  end
end