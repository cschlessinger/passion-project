class CreateArticles < ActiveRecord::Migration
  def change
  	create_table :articles do |t|
  		t.string :url
  		t.string :headline
  		t.string :lead
  		t.string :keywords
  	end
  end
end
