class Branche < ActiveRecord::Base
	belongs_to :enq
	belongs_to :enq_page
	belongs_to :enq_question, :foreign_key => 'page_id'
	belongs_to :answer
end
