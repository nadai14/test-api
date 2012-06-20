# coding: utf-8

class EnqPagesController < ApplicationController

  def show
    @page = params[:id] != 'first' ? find_by_id(params[:id]) : first(params[:enq_id], params[:face])

    raise NotFoundException.new PAGE_DOES_NOT_EXIST if @page.nil?
    raise NotFoundException.new ID_MISS_MATCH_PAGE if @page.enq_face.enq_id != params[:enq_id]
    raise DataIncompletedException.new IMVALID_QUESTION if @page.enq_questions.any? {|eq| eq.question.needs_choices? && eq.question.choices.empty?}
    # TODO: move to the campaigin api
    @count = EnqQuestion.
      includes(:enq_page => {:enq_face => :enq}).
      where('enqs.uuid = ? AND enq_faces.face = ?', @page.enq_face.enq_id, @page.enq_face.face).
      count(:uuid)
  end

  private

  def first(enq_id, face)
    EnqPage.
      includes([{:enq_questions => [{:question => :choices}, :branches]}, :enq_face]).
      order('enq_questions.num, choices.`order`').
      where('enq_faces.enq_id = ? AND enq_faces.face = ? AND enq_pages.uuid = enq_faces.first_page_id', enq_id, face).
      first
  end

  def find_by_id(id)
    EnqPage.
      includes([{:enq_questions => [{:question => :choices}, :branches]}, :enq_face]).
      order('enq_questions.num, choices.`order`').
      find_by_uuid(id)
  end

end
