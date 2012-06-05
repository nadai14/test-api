# coding: utf-8

class EnqsController < ApplicationController
  respond_to :json

  # GET /enqs/1?face="face"
  # GET /enqs/1.json
  # アンケート情報取得機能
  def show
	enq_face = params[:face]
	message = "<p>友達にシェアしよう！</p>"
	
    #enq = Enq.find_by_uuid(params[:id]),
	enq = Enq.find_by_id(params[:id],
	                     :include => :enq_faces,		# アンケートフェイスからの情報を取得
						 :conditions => ["enq_faces.face = ?", enq_face]	# フェイスを条件として検索する
						 )
    render :json => [enq.to_json(:only => [:id,:movie,:thumbnail,:title,:description],
	                             :include => {:enq_faces => {:only => [:first_page_id,:wait_until,:css]}}
								 ),
					message.to_json]
	end
  end
end
