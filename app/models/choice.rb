class Choice < ActiveRecord::Base
  include Extensions::UUID
  acts_as_paranoid

  attr_accessible :content, :question_id, :order

  belongs_to :question
end
