# coding: utf-8

require 'pathname'

class CampaignsController < ApplicationController

  def show
    terminal = params[:terminal].try(:downcase).try(:to_sym) || :pc
    face = terminal == :iphone || terminal == :android ? "SP" : "PC"
    @campaign = Campaign.includes(:enq => :enq_faces).where("enq_faces.face = ?", face).find_by_mid(params[:id])
    raise NotFoundException.new CAMPAIGN_DOES_NOT_EXIST unless @campaign
    raise ForbiddenException.new BEFORE_OPENING if @campaign.status == 0 # TODO: delete this line after 6/18
    raise ForbiddenException.new AFTER_CLOSING if @campaign.closed?
    type = MOVIE_TYPES[terminal]
    @mime_type = type[:mime_type]
    @movie = @campaign.movie.nil? ? nil : Pathname(@campaign.movie).sub_ext(type[:suffix]).to_s
  end

  MOVIE_TYPES = {
    :iphone  => {:mime_type => "application/x-mpegURL", :suffix => ".m3u8"}, 
    :android => {:mime_type => "video/x-flv",           :suffix => ".flv"},
    :pc      => {:mime_type => "video/mp4",             :suffix => ".mp4"}
  }

end
