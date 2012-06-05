class Enq < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :description, :message, :movie, :status, :thumbnail, :title, :closed_at, :updated_by, :updated_at

  has_many :enq_faces
end
