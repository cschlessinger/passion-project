class CreateArticles < ActiveRecord::Migration
  def change
  	create_table :articles do |t|
  		t.string :article_id
  		t.string :url
  		t.string :headline
  		t.string :lead
  		t.string :keywords
  		t.integer :latest
  	end
  end
end
