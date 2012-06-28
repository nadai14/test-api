# coding: utf-8

class EnqPagesController < ApplicationController

  def show
    @page = EnqPage.
      includes([{:enq_questions => [{:question => :choices}, :branches]}, :enq_face]).
      order('enq_questions.num, choices.`order`').
      where('enq_questions.deleted_at IS NULL AND questions.deleted_at IS NULL AND choices.deleted_at IS NULL AND branches.deleted_at IS NULL AND enq_faces.deleted_at IS NULL').
      find_by_uuid(params[:id])
    raise NotFoundException.new PAGE_DOES_NOT_EXIST if @page.nil?
    raise NotFoundException.new ID_MISS_MATCH_PAGE if @page.enq_face.enq_id != params[:enq_id]
    raise DataIncompletedException.new IMVALID_QUESTION if @page.enq_questions.any? {|eq| eq.question.needs_choices? && eq.question.choices.empty?}
  end

end
