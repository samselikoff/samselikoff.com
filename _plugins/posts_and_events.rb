module PostsAndEvents
  class Generator < Jekyll::Generator
    def generate(site)
      posts_and_events = site.posts.map(&:to_liquid).concat site.data['events']

      site.data['posts_and_events'] = posts_and_events.sort_by{ |item| item['date'] }.reverse
    end
  end
end