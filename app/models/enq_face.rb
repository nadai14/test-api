class EnqFace < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :enq_id, :face, :point, :first_page_id, :wait_until, :css, :updated_by, :updated_at

  belongs_to :enq
  has_one :enq_page, :foreign_key => 'first_page_id'
end
