class EnqQuestion < ActiveRecord::Base
  include Extensions::UUID
  acts_as_paranoid

  attr_accessible :enq_page_id, :num, :question_id, :seq

  belongs_to :enq_page
  belongs_to :question
  has_many :answers
  has_many :branches
end
