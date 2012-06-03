class EnqFace < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :enq_id, :face, :first_page_id, :wait_until, :css

  belongs_to :enq
  has_one :enq_page, :foreign_key => 'first_page_id'
end
