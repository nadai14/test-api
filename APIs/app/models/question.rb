class Question < ActiveRecord::Base
	has_many :enq_questions,	:dependent => :destroy
	has_many :enq_pages,	:through => :enq_questions
	has_many :choices
end
