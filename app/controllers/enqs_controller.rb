# coding: utf-8

class EnqsController < ApplicationController
  # GET /enqs/1?face="face"
  # GET /enqs/1.json
  # アンケート情報取得機能
  def show
    enq_face = params[:face]

    enq = Enq.find_by_uuid(params[:id],
	                       :include => :enq_faces,		# アンケートフェイスからの情報を取得
                           :conditions => ["enq_faces.face = ?", enq_face]	# フェイスを条件として検索する
                          )

	# セッションIDの取得
	session_id = self.cookies_session_id
	
    # 例外がないときはレンダリング
    render :json => [enq.to_json(:only => [:id,:movie,:thumbnail,:point,:title,:description,:message,:conversion_tag,:second_picture,:second_point,:client_url],
                                 :include => {:enq_faces => {:only => [:first_page_id,:wait_until,:css]}}
                                 ),
                     session_id.to_json]
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
