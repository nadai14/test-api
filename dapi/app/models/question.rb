class Question < ActiveRecord::Base
  attr_accessible :answer_content, :answer_description, :content, :kind, :question_id, :required, :title, :update_date, :update_name

end
