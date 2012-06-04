class EnqFace < ActiveRecord::Base
  attr_accessible :css, :enq_id, :face, :first_page_id, :update_date, :update_name, :wait_until
  
  belongs_to :enq
end
