class Answer < ActiveRecord::Base
  include Extensions::UUID
  acts_as_paranoid

  attr_accessible :answer, :enq_question_id, :user_agent, :campaign_id, :user_id

  belongs_to :enq_question
end
