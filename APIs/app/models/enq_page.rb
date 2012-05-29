class EnqPage < ActiveRecord::Base
	belongs_to :enq
	has_many :enq_questions,	:dependent => :destroy
	has_many :questions,	:through => enq_questions
end
