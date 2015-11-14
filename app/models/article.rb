class Article < ActiveRecord::Base

	include HTTParty
  has_and_belongs_to_many :causes    

  def self.query_articles(keyword)
    url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=#{keyword}#{@fq}&sort=newest&api-key=#{ENV['NYTimesAPI']}"
  	response = HTTParty.get(url)
  	@articles = response["response"]['docs']
  	@articles
  end

  def self.populate_db(keyword="humanitarian+aid")
  	self.query_articles(keyword)
    p "*" * 100
    p keyword
  	all_keys = []
		@ids = Article.pluck(:article_id) # Store all previous DB URLs in an array
        binding.pry
  	Article.update_all(latest: 0)
  	@articles.each do |article|
  		article['keywords'].each do |keyword_collection|
				all_keys << keyword_collection['value']
  		end
  		unless @ids.include?(article['_id'])
	  		Article.create(article_id: article['_id'], url: article["web_url"], headline: article['headline']['main'], lead: article['lead_paragraph'], keywords: all_keys, latest: 1)
  		end
  	end
  end
end
