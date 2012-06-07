class Question < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :answer_content, :answer_description, :content, :kind, :required, :title, :updated_by, :updated_at

  has_many :choices
  belongs_to :enq_question
end
