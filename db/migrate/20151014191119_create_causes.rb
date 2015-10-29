class CreateCauses < ActiveRecord::Migration
  def change
  	create_table :causes do |t|
  		t.string :name
  		t.string :category
  		t.string :description
  	end
  end
end
