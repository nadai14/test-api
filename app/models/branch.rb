class Branch < ActiveRecord::Base
  include Extensions::UUID
  acts_as_paranoid

  attr_accessible :answer, :enq_question_id, :next_page_id, :wait_until

  belongs_to :enq_question
  has_one :enq_page
end
