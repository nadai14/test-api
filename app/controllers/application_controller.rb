# coding: utf-8

module ApiController
  class ApiException < Exception
    def initialize(msg)
      @message = msg
    end
    attr_reader :message
  end

  class UnauthorizedException < ApiException; end
  class NotFoundException < ApiException; end
  class ForbiddenException < ApiException; end
  class DataIncompletedException < ApiException; end

  ENQ_DOES_NOT_EXIST = "アンケートIDが存在しない"
  PAGE_DOES_NOT_EXIST = "ページIDが存在しない"
  ID_MISS_MATCH = "アンケートIDとページIDが矛盾している"
  BEFORE_OPENING = "状態が入稿前"
  AFTER_CLOSING = "状態が終了"

end

class ApplicationController < ActionController::Base
  include ApiController
  protect_from_forgery

  rescue_from UnauthorizedException, :with => :unauthorized
  rescue_from NotFoundException, :with => :not_found
  rescue_from ForbiddenException, :with => :forbidden
  rescue_from DataIncompletedException, :with => :data_incompleted

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
    render :status => 409, :json => {:message => e.message} # 409 is strange
  end

  
  def cookies_session_id
    session_id = cookies[:session_id]
    unless session_id then
      cookies[:session_id] = {:value => UUIDTools::UUID.random_create.to_s}
      session_id = cookies[:session_id]
	end
	session_id
  end
end
