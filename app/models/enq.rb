class Enq < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :description, :message, :movie, :status, :thumbnail, :title

  has_many :enq_faces
end
