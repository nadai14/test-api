class EnqPagesController < ApplicationController
  def get
  	# get each parameter
  	@enq_id = params[:enq_id]
  	@page_id = params[:page_id]
	@key = params[:key]
  	
  	@enq_pages = EnqPage.find(:all, include => [:enq_question, {:question => :choice}])
  	
  	respond_to do |format|
  	  format.json { render :json => @enq_pages }	# get.json.erb
	end
  end

  def index
  end

  def show
  end

end
