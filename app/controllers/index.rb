get '/' do
	@articles = Article.all
	erb :index
end

get '/update' do
	Article.populate_db
	@new_articles = Article.where(latest: 1).to_json
end