class Enq < ActiveRecord::Base
	has_many :enq_pages
	has_many :enq_questions
	has_many :answers
end
