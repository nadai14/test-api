# coding: utf-8

class EnqPagesController < ApplicationController

  def first
    a = EnqFace.all
    render :json => a.to_json(:include => :enq_pages)
  end

  def show
    page = EnqPage.find_by_uuid(params[:id])
    raise NotFoundException.new PAGE_DOES_NOT_EXIST unless page
    raise NotFoundException.new ID_MISS_MATCH unless page.enq_face.enq_id == params[:enq_id]
    raise ForbiddenException.new BEFORE_OPENING if page.enq_face.enq.status == 0
    raise ForbiddenException.new AFTER_CLOSINGG if page.enq_face.enq.status == 9
    render :json => page.to_json(:include => {:enq_face => {}, :enq_questions => :question})
  end
end
