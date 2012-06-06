#coding: utf-8
class ApplicationController < ActionController::Base
  protect_from_forgery
  
  class UnauthorizedException < Exception; end
end
