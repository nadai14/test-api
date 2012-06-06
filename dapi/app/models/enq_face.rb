class EnqFace < ActiveRecord::Base
  include Extensions::UUID
  
  attr_accessible :enq_id, :face, :point, :first_page_id, :wait_until, :css, :update_date, :update_name
  
  belongs_to :enq
end
