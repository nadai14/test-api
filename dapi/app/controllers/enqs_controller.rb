# coding: utf-8

class EnqsController < ApplicationController
  # GET /enqs/1?face="face"
  # GET /enqs/1.json
  # アンケート情報取得機能
  def show
	enq_face = params[:face]
	
    #enq = Enq.find_by_uuid(params[:id]),
	enq = Enq.find_by_id(params[:id],
	                     :include => :enq_faces,		# アンケートフェイスからの情報を取得
						 :conditions => ["enq_faces.face = ?", enq_face]	# フェイスを条件として検索する
						 )
	# 指定した条件でアンケートが見つからなかった時
	unless enq then
	  # 404 例外を投げる
	  render 'shared/not_found', :status => 404
	end
	
	# アンケートの状態が入稿前、もしくは終了だった時
	if enq.status === 0 or enq.status === 9
	  # 403 例外を投げる
    　　render 'shared/forbidden_enq', :status => 403
	else
	  render :json => enq.to_json(:only => [:id,:movie,:thumbnail,:title,:description,:message],
	                               :include => {:enq_faces => {:only => [:first_page_id,:wait_until,:css]}}
								   )
	end
  end
end
