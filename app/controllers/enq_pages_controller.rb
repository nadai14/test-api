# coding: utf-8

class EnqPagesController < ApplicationController

  def index
    render :json => EnqFace.all(:include => :enq_pages)
  end


  def show
    @page = params[:id] != 'first' ? find_by_id(params[:id]) : first(params[:enq_id], params[:face])

    raise NotFoundException.new PAGE_DOES_NOT_EXIST if @page.nil?
    raise NotFoundException.new ID_MISS_MATCH_PAGE if @page.enq_face.enq_id != params[:enq_id]
    raise DataIncompletedException.new IMVALID_QUESTION if @page.enq_questions.any? {|eq| eq.question.needs_choices? && eq.question.choices.empty?}
  end

  private

  def first(enq_id, face)
    EnqPage.
      includes([{:enq_questions => [{:question => :choices}, :branches]}, :enq_face]).
      order('enq_questions.num, choices.`order`').
      where('enq_faces.enq_id = ? AND enq_faces.face = ?', enq_id, face).
      first
  end

  def find_by_id(id)
    EnqPage.
      includes([{:enq_questions => [{:question => :choices}, :branches]}, :enq_face]).
      order('enq_questions.num, choices.`order`').
      find_by_uuid(id)
  end

end
