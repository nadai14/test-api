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
end
