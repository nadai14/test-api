class Answer < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :answer, :enq_question_id, :session_id, :user_agent, :updated_by, :updated_at

  belongs_to :enq_question
end
