class Article < ActiveRecord::Base

	include HTTParty
  # has_many :charities
  # has_many :causes, through: :charities

  def self.query_articles
  	response = HTTParty.get('http://api.nytimes.com/svc/search/v2/articlesearch.json?q=humanitarian+aid&fq=type_of_material:("News") AND section_name:("World")&sort=newest&api-key=ec7fb763d9053389406d5d284fcab0b0:14:59506039')
  	@articles = response["response"]['docs']
  	# pp @articles
  end

  def self.populate_db
  	self.query_articles
  	all_keys = []
  	# binding.pry

  	# @articles[0]['keywords'].each {|collection| p collection['value']}

  	@articles.each do |article|
  		article['keywords'].each do |keyword_collection|
				all_keys << keyword_collection['value'].chomp
  		end
  		Article.create(url: article["web_url"], headline: article['headline']['main'], lead: article['lead_paragraph'], keywords: all_keys)
  	end
  end
end
