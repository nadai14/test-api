class Enq < ActiveRecord::Base
  include Extensions::UUID
  acts_as_paranoid

  attr_accessible :message, :button_text

  has_many :campaigns
  has_many :enq_faces
end
