class Question < ActiveRecord::Base
  include Extensions::UUID
  acts_as_paranoid

  attr_accessible :answer_content, :answer_description, :content, :kind, :required, :title

  has_many :choices
  has_many :enq_question

  def needs_choices?
    ['radio', 'select', 'checkbox'].include? kind
  end

end
