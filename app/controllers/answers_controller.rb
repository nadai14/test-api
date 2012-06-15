# coding: utf-8

class AnswersController < ApplicationController

  def create
    page = EnqPage.
      includes([{:enq_questions => [{:question => :choices}, :branches]}, {:enq_face => {:enq => :campaigns}}]).
      find_by_uuid(params[:page_id])
    raise NotFoundException.new PAGE_DOES_NOT_EXIST if page.nil?
    raise NotFoundException.new ID_MISS_MATCH_PAGE if page.enq_face.enq_id != params[:enq_id]
    raise NotFoundException.new ID_MISS_MATCH_CAMPAIGN unless page.enq_face.enq.campaigns.any? {|c| c.uuid == params[:campaign_id]}
    answers = params.
      select{|k, v| k.start_with? "answer_"}.                  # Hash#select returns a Hash
      inject({}){|a, (k, v)| a.tap{|o| o[k[7..-1].to_i] = v}}  # Hash#map does not return a Hash!!
    raise BadRequestException.new REQUIRED_QUESTION unless page.enq_questions.select{|q| q.question.required}.all?{|q| answer.has_key? q.num}
    (valid, invalid) = answers.partition{|k, v| valid?(k, v, page.enq_questions)}
    valid.each{|k, v| register(k, v, page.enq_questions, params[:campaign_id], params[:uid], request.headers["User-Agent"])}
    raise BadRequestException.new IMVALID_QUESTION unless invalid.empty?
  end

  private

  def valid?(num, content, enq_questions)
    enq_question = enq_questions.find{|q| q.num == num}
    question = enq_question.question
    return false if enq_question.nil?
    return false if question.needs_choices? && question.choices.none?{|c| c.content == content}
    return false if question.kind == "numeric" && content =~ /[^0-9]+/
    return false if question.required && content == ""
    true
  end

  def register(num, content, enq_questions, campaign_id, uid, user_agent)
    enq_question = enq_questions.find{|q| q.num == num}
    Answer.create(campaign_id: campaign_id, enq_question_id: enq_question.uuid, user_id: uid, user_agent: user_agent, answer: content)
  end

end
