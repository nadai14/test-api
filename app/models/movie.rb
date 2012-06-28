class Movie < ActiveRecord::Base
  include Extensions::UUID
  acts_as_paranoid

  attr_accessible :campaign_id, :mime_type, :src, :duration

  belongs_to :campaign
end
