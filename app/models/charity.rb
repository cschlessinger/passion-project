class Charity < ActiveRecord::Base

	include HTTParty

  has_many :articles, through: :articles_causes
  belongs_to :cause

  def self.query_charity_orgs
  	response = HTTParty.get("http://api.charitynavigator.org/api/v1/search/?app_key=#{ENV['CharityAPI']}&app_id=#{ENV['CharityID']}&format=json&limit=100")
  	@orgs = response["objects"]
  end

  def self.populate_db
  	Charity.query_charity_orgs
  	@orgs.each do |org|
  		Charity.create(name: org["Charity_Name"], cat: org["Category"], cause: org["Cause"], state: org["state"], url: org["URL"], city: org["city"])
  	end
  end

end
