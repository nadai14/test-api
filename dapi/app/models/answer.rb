class Answer < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :answer, :campaign_id, :enq_question_id, :session_id, :user_id, :user_agent, :updated_by, :updated_at

  belongs_to :enq_question
end
