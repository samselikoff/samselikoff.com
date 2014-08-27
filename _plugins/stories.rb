module Stories
  class Generator < Jekyll::Generator
    def generate(site)
      posts_hashes = site.posts.map(&:to_liquid).each{ |post| post['type'] = 'post'}
      all_stories = posts_hashes.concat(site.data['events']).sort_by{ |item| item['date'] }.reverse

      stories, future_stories = all_stories.partition{ |story| story['date'] < Time.now }

      site.data['stories'] = stories
      site.data['future_stories'] = future_stories
    end
  end
end