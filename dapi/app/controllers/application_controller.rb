#coding: utf-8
class ApplicationController < ActionController::Base
  protect_from_forgery
	# RecordNotFound例外を処理するのはid_invalidメソッド
  rescue_from ActiveRecord::RecordNotFound, :with => :id_invalid
	
  private
  def id_invalid(e)
		# ステータス404(Not Found)で指定ビューを描画
	render 'shared/record_not_found', :status => 404
  end
end
