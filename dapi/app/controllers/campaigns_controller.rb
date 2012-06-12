# coding: utf-8

class CampaignsController < ApplicationController

  def show
    @campaign = Campaign.find_by_uuid(params[:id], {
      :include => {:enq => :enq_faces}, 
      :conditions => ["enq_faces.face = ?", params[:face].upcase]})

    raise NotFoundException.new CAMPAIGN_DOES_NOT_EXIST unless @campaign
    raise ForbiddenException.new BEFORE_OPENING if @campaign.status == 0
    raise ForbiddenException.new AFTER_CLOSINGG if @campaign.status == 9
  end

end
