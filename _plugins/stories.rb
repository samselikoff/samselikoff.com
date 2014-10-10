module Stories
  class Generator < Jekyll::Generator
    def generate(site)
      talks = site.collections['talks'].docs.map(&:to_liquid).each{ |item| item['type'] = 'talk'}
      posts = site.posts.map(&:to_liquid).each{ |item| item['type'] = 'post'}

      all_stories = posts.concat(talks).sort_by{ |item| item['date'].to_date }.reverse

      stories, future_stories = all_stories.partition{ |story| story['date'].to_date < Date.today }

      site.data['stories'] = stories
      site.data['future_stories'] = future_stories
    end
  end
end
