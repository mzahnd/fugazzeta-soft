#   Copyright 2021 Martín E. Zahnd
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       https://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.


# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) { |repo_name| "https://github.com/#{repo_name}" }

gem "jekyll"
gem "kramdown"
# gem "kramdown-syntax-coderay", "~> 1.0"
gem "rouge"
gem "webrick", "~> 1.7"

# Plugins
group :jekyll_plugins do
# Sitemap for browsers
  gem 'jekyll-sitemap'
  #
  # KaTeX equations
  gem 'jekyll-katex'
  
  # Table of Contents
  # https://github.com/toshimaru/jekyll-toc
  gem 'jekyll-toc'

  # Cool block quotes 
  # https://github.com/lazee/premonition
  # gem "premonition", "4.0.1"
  
  # Site verification
  # https://github.com/erikw/jekyll-google_search_console_verification_file/

  # Adds loading="lazy" to images and iframe
  # https://github.com/gildesmarais/jekyll-loading-lazy
  gem 'jekyll-loading-lazy'

end
