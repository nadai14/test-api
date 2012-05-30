class EnqPage < ActiveRecord::Base
	belongs_to :enq
	has_many :enq_questions
end
