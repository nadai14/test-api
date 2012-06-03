class EnqFace < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :enq_id, :face, :first_page_id, :wait_until, :css

  belongs_to :enqs
end
