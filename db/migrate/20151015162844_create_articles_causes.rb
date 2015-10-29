class CreateArticlesCauses < ActiveRecord::Migration
  def change
  	create_table :articles_causes do |t|
  		t.belongs_to :article, index: true
  		t.belongs_to :cause, index: true
  	end
  end
end
