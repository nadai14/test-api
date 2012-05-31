class EnqQuestion < ActiveRecord::Base
	belongs_to :enq
	belongs_to :question, :foreign_key => 'question_id'
	has_many :branches
	has_many :answers
end
