class Branche < ActiveRecord::Base
	belongs_to :enq_question, :foreign_key => 'page_id'
end
