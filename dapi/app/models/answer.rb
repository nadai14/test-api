class Answer < ActiveRecord::Base
  include Extensions::UUID
  
  attr_accessible :answer, :enq_id, :num, :update_date, :update_name

end
