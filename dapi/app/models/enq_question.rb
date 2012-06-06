class EnqQuestion < ActiveRecord::Base
  include Extensions::UUID
  
  attr_accessible :enq_id, :num, :question_id, :update_date, :update_name

end
