get '/' do
	@articles = Article.all
	erb :index
end

post '/search' do
end