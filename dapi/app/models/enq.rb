# coding: utf-8
class Enq < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :status, :opening_at, :closing_at, :title, :description, :message, :movie, :thumbnail, :update_date, :update_name

  has_many :enq_faces
end
