class Cause < ActiveRecord::Base

	include HTTParty

  has_and_belongs_to_many :articles
  has_many :charities

  def self.query_charity_causes
  	response = HTTParty.get('http://api.charitynavigator.org/api/v1/causes/?app_key=0eff25692da9109677649750f51ff65c&app_id=cc464b0f&format=json&limit=100')
  	@causes = response["objects"]
  end

  def self.populate_db
  	self.query_charity_causes
    @causes.each do |cause|
  		Cause.create(name: cause["cause"], category: cause["category"], description: cause["description"])
  	end
  end

end
