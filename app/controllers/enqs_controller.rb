# coding: utf-8

class EnqsController < ApplicationController
  # GET /enqs/1?face="face"
  # GET /enqs/1.json
  # アンケート情報取得機能
  def show
    begin
      enq_face = params[:face]

      enq = Enq.find_by_uuid(params[:id],
                             :include => :enq_faces,		# アンケートフェイスからの情報を取得
                             :conditions => ["enq_faces.face = ?", enq_face]	# フェイスを条件として検索する
                            )

      # 指定した条件でアンケートが見つからなかった時 NotFoundException を投げる
      raise NotFoundException.new ENQ_DOES_NOT_EXIST unless enq
      # アンケートの状態が入稿前、もしくは終了、または終了日時を過ぎていた時、ForbiddenException を投げる
      raise ForbiddenException.new BEFORE_OPENING if enq.status == 0
      raise ForbiddenException.new AFTER_CLOSING if enq.status == 9 or (enq.closing_at? and enq.closing_at > Time.now)

      # 例外がないときはレンダリング
      render :json => enq.to_json(:only => [:id,:movie,:thumbnail,:point,:title,:description,:message,:conversion_tag,:second_picture,:second_point,:client_url],
                                   :include => {:enq_faces => {:only => [:first_page_id,:wait_until,:css]}}
                                   )
    end
  end
end
