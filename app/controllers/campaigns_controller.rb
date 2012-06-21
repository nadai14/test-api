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
    @movies = @campaign.movie.nil? ? [] : movies(@campaign.movie)
  end

  def movies(path)
    MOVIE_TYPES.map do |hash|
      hash.each_with_object({}) do |(k, v), a|
         a[k] = k == :suffix ? Pathname(path).sub_ext(v).to_s : v
      end
    end
  end

  MOVIE_TYPES = [
    {:mime_type => "application/x-mpegURL", :suffix => ".m3u8"}, 
    {:mime_type => "video/x-flv",           :suffix => ".flv"},
    {:mime_type => "video/mp4",             :suffix => ".mp4"}
  ]

end
