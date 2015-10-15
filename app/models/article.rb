class Article < ActiveRecord::Base

	include HTTParty
  # has_many :charities
  # has_many :causes, through: :charities

  def self.query_articles
  	response = HTTParty.get('http://api.nytimes.com/svc/search/v2/articlesearch.json?q=italy&fq=type_of_material:("News") AND section_name:("World")&sort=newest&api-key=ec7fb763d9053389406d5d284fcab0b0:14:59506039')
  	@articles = response["response"]['docs']
  	# binding.pry
  	pp @articles
  end

  def self.populate_db
  	self.query_articles
  	all_keys = []
  	# binding.pry
		@ids = Article.pluck(:article_id) # Store all previous DB URLs in an array
  	Article.update_all(latest: 0)
  	@articles.each do |article|
  		article['keywords'].each do |keyword_collection|
				all_keys << keyword_collection['value']
  		end
      # @TODO: remove comments around this branching to renenable caching features
  		# unless @ids.include?(article['_id'])
	  		Article.create(article_id: article['_id'], url: article["web_url"], headline: article['headline']['main'], lead: article['lead_paragraph'], keywords: all_keys, latest: 1)
  		# end
  	end
  end
end