# coding: utf-8
class Enq < ActiveRecord::Base
  attr_accessible :css, :description, :enq_id, :first_page_id, :movie, :status, :thumbnail, :title, :update_date, :update_name

  has_many :enq_faces
  
  validates :id,
    :presence => true
end
