class CreateCharities < ActiveRecord::Migration
  def change
  	create_table :charities do |t|
  		t.string :name
  		t.string :cat
  		t.string :cause
  		t.string :url
  		t.string :city
  		t.string :state
  	end
  end
end
