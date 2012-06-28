class Campaign < ActiveRecord::Base
  self.primary_key = 'mid'
  acts_as_paranoid

  attr_accessible :mid, :mcd, :enq_id, :banner_title, :client_url, :closing_at, :conversion_tag, :created_by, :message, :opening_at, :platform, :point, :second_picture, :second_point, :thumbnail, :button_text

  belongs_to :enq
  has_many :campaign_faces
  has_many :movies

  def closed?
    closing_at.present? && closing_at <= Time.now
  end

end
