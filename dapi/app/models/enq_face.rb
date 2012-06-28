class EnqFace < ActiveRecord::Base
  include Extensions::UUID
  acts_as_paranoid

  attr_accessible :enq_id, :face, :first_page_id, :wait_until

  belongs_to :enq
  has_many :enq_pages
  has_one :enq_page, :foreign_key => 'first_page_id'
end
