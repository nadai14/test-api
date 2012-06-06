class EnqPage < ActiveRecord::Base
  include Extensions::UUID
  
  attr_accessible :description, :enq_id, :face, :next_page_id, :page_id, :update_date, :update_name, :wait_until

end
