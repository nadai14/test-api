class CampaignFace < ActiveRecord::Base
  include Extensions::UUID
  acts_as_paranoid

  attr_accessible :campaign_id, :face, :css, :title, :description

  belongs_to :campaign
end
