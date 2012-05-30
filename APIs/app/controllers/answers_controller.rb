class AnswersController < ApplicationController
  def send
    @enq_id = params[:enq_id]
	@page_id = params[:page_id]
	@answer = params[:answer]
	@key = params[:key]
	
  	@result = Answer.find(
		:condition => [{@enq_id = answers.enq_id}, {@page_id = answers.page_id}],
		:select => {enq_id, page_id, answer})
		
  	
  	respond_to do |format|
  	  format.json { render :json => @result }	# get.json.erb
	end
  end

  def index
  end

  def show
  end

end
