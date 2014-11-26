task :deploy do
  puts '   [message] Ensure source is clean'
  system('git diff --exit-code') or exit!(1)

  puts '   [message] Building to ../tmp'
  system 'rm -rf ../tmp'
  system 'mkdir ../tmp'
  system 'jekyll build --destination ../tmp'

  puts '   [message] Updating out master'
  system 'git co master'
  system 'cp -rf ../tmp/* .'
  system 'git add .'
  system 'git commit -am "Updating site"'

  puts '   [message] Pushing to github'
  system 'git push'
  system 'git co source'
end
