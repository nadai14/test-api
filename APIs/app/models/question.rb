class Question < ActiveRecord::Base
	has_many :enq_questions
	has_many :choices
end
