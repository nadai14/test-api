# coding: utf-8

class EnqsController < ApplicationController
  # GET /enqs/1?face="face"
  # GET /enqs/1.json
  # アンケート情報取得機能
  def show
    begin
      enq_face = params[:face]

      enq = Enq.find_by_uuid(params[:uuid],
	                         :include => :enq_faces,		# アンケートフェイスからの情報を取得
						     :conditions => ["enq_faces.face = ?", enq_face]	# フェイスを条件として検索する
						     )

	  # 指定した条件でアンケートが見つからなかった時
	  unless enq then
	    # NotFoundException 例外を投げる
	    raise NotFoundException.new "testnf"
	  end
	  # アンケートの状態が入稿前、もしくは終了だった時
	  if enq.status === 0 or enq.status === 9
	    # ForbiddenException 例外を投げる
        raise ForbiddenException.new "testf"
	  end
	rescue UnauthorizedException
	  # 認証されていないときは UnauthorizedException 例外を投げる
	  raise UnauthorizedException
    else
	  # 例外がないときはレンダリング
      render :json => enq.to_json(:only => [:id,:movie,:thumbnail,:title,:description,:message],
	                              :include => {:enq_faces => {:only => [:first_page_id,:wait_until,:css]}}
								  )
	end
  end
end
