class EnqQuestion < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :enq_page_id, :num, :question_id, :seq, :updated_by, :updated_at

  belongs_to :enq_page
  has_one :question
  has_many :answers
end
