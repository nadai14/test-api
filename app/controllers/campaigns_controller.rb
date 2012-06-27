# coding: utf-8

require 'pathname'

class CampaignsController < ApplicationController

  def show
    terminal = params[:terminal].try(:downcase).try(:to_sym) || :pc
    face = terminal == :iphone || terminal == :android ? "SP" : "PC"
    @campaign = Campaign.
      includes(:campaign_faces, :movies, {:enq => :enq_faces}).
      where("enq_faces.face = ? AND campaign_faces.face = ? AND movies.mime_type IS NOT NULL", face, face).
      find_by_mid(params[:id])
    raise NotFoundException.new CAMPAIGN_DOES_NOT_EXIST unless @campaign
    raise ForbiddenException.new AFTER_CLOSING if @campaign.closed?
  end

end
