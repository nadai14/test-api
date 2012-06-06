class Choice < ActiveRecord::Base
  include Extensions::UUID
  
  attr_accessible :choice_id, :content, :question_id, :update_date, :update_name

end
