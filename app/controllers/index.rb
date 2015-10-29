get '/' do
	@articles = Article.all
	erb :index
end

get '/update' do
	p "*" * 100
	Article.populate_db
	p @new_articles = Article.where(latest: 1).to_json
end

post '/search' do
	Article.populate_db(params[:query])
	p @new_articles = Article.where(latest: 1).to_json
end