class EnqQuestion < ActiveRecord::Base
	belongs_to :enq_page
	belongs_to :question
	has_many :answers
	has_many :branches
end
