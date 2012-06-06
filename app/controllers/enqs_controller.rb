# coding: utf-8

class EnqsController < ApplicationController
  # GET /enqs/1?face="face"
  # GET /enqs/1.json
  # アンケート情報取得機能
  def show
    begin
      enq_face = params[:face]
      session_id = 'test'

      enq = Enq.find_by_uuid(params[:uuid],
	                         :include => :enq_faces,		# アンケートフェイスからの情報を取得
                             :conditions => ["enq_faces.face = ?", enq_face]	# フェイスを条件として検索する
                            )

      # 指定した条件でアンケートが見つからなかった時
      unless enq then
        # NotFoundException 例外を投げる
        raise NotFoundException.new "testnf"
      end
      # アンケートの状態が入稿前、もしくは終了、または終了日時を過ぎていた時
      if enq.status == 0 or enq.status == 9 or (enqs.closing_at != null and enqs.closing_at > Time.now)
        # ForbiddenException 例外を投げる
        raise ForbiddenException.new "testf"
      end
    rescue UnauthorizedException
      # 認証されていないときは UnauthorizedException 例外を投げる
      raise UnauthorizedException.new "testu"
    else
      # 例外がないときはレンダリング
      render :json => [enq.to_json(:only => [:id,:movie,:thumbnail,:point,:title,:description,:message,conversion_tag,second_picture,second_point,client_url],
                                   :include => {:enq_faces => {:only => [:first_page_id,:wait_until,:css]}}
                                   ),
                       session_id.to_json]
    end
  end
end
