# coding: utf-8

module ApiController
  class ApiException < Exception
    def initialize(msg)
      @message = msg
    end
    attr_reader :message
  end

  class BadRequestException < ApiException; end
  class UnauthorizedException < ApiException; end
  class NotFoundException < ApiException; end
  class ForbiddenException < ApiException; end
  class DataIncompletedException < ApiException; end

  CAMPAIGN_DOES_NOT_EXIST = "キャンペーンIDが存在しない"
  ENQ_DOES_NOT_EXIST = "アンケートIDが存在しない"
  PAGE_DOES_NOT_EXIST = "ページIDが存在しない"
  ID_MISS_MATCH = "アンケートIDとページIDが矛盾している"
  IMVALID_QUESTION = "回答に誤りが存在している"
  BEFORE_OPENING = "状態が入稿前"
  AFTER_CLOSING = "状態が終了" 
  REQUIRED_QUESTION = "回答必須の設問に回答していない" 

end

class ApplicationController < ActionController::Base
  include ApiController

  rescue_from BadRequestException, :with => :bad_request
  rescue_from UnauthorizedException, :with => :unauthorized
  rescue_from NotFoundException, :with => :not_found
  rescue_from ForbiddenException, :with => :forbidden
  rescue_from DataIncompletedException, :with => :data_incompleted

  def bad_request(e)
    render :status => 400, :json => {:message => e.message}
  end

  def unauthorized(e)
    render :status => 401, :json => {:message => e.message}
  end

  def not_found(e)
    render :status => 404, :json => {:message => e.message}
  end

  def forbidden(e)
    render :status => 403, :json => {:message => e.message}
  end

  def data_incompleted(e)
    render :status => 500, :json => {:message => e.message}
  end

end
