class Campaign < ActiveRecord::Base
  include Extensions::UUID
  attr_accessible :enq_id, :banner_title, :client_url, :closing_at, :conversion_tag, :created_by, :message, :movie, :opening_at, :platform, :point, :second_picture, :second_point, :status, :thumbnail, :updated_by

  belongs_to :enq
end
