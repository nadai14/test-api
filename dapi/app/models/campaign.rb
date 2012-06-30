class Campaign < ActiveRecord::Base
  self.primary_key = 'mid'
  acts_as_paranoid

  attr_accessible :mid, :mcd, :name, :enq_id, :banner_title, :client_url, :closing_at, :conversion_tag, :created_by, :message, :opening_at, :platform, :point, :second_picture, :second_point, :thumbnail, :thanks_button_text, :page_button_text, :already_button_text

  belongs_to :enq
  has_many :campaign_faces
  has_many :movies

  def closed?
    closing_at.present? && closing_at <= Time.now
  end

end
