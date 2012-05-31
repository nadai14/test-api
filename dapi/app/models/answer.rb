class Answer < ActiveRecord::Base
	belongs_to :enq
	belongs_to :enq_questions
end
