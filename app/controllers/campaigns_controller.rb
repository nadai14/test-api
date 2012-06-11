
class CampaignsController < ApplicationController
  def show
    begin
      enq_face = params[:face]

      camp = Campaign.find_by_uuid(params[:id],
                             :include => [:enqs => :enq_face],		# アンケートフェイスからの情報を取得
                             :conditions => ["enq_faces.face = ?", enq_face]	# フェイスを条件として検索する
                            )

      # 指定した条件でアンケートが見つからなかった時 NotFoundException を投げる
      raise NotFoundException.new ENQ_DOES_NOT_EXIST unless camp
      # アンケートの状態が入稿前、もしくは終了、または終了日時を過ぎていた時、ForbiddenException を投げる
      raise ForbiddenException.new BEFORE_OPENING if camp.status == 0
      raise ForbiddenException.new AFTER_CLOSING if camp.status == 9 or (camp.closing_at? and camp.closing_at > Time.now)

      # 例外がないときはレンダリング
      render :json => camp.to_json(:only => [:id,:enq_id,:platform,:movie,:thumbnail,:point,:message,:conversion_tag,:second_picture,:second_point,:client_url],
                                   :include => [:enqs => {:enq_faces => {:only => [:first_page_id,:wait_until,:css,:title,:description]}}]
                                   )
    end
  end
end
