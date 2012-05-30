class EnqsController < ApplicationController
  def get
    @enqs = Enq.find(params[:enq_id])
	#@key = params[:key]

	#authentication key
	
	#get enq info
    respond_to do |format|
      format.json  { render :json => @enqs }	# get.json.erb
    end  end

  def index
    @enqs = Enq.all

    respond_to do |format|
      format.html	# index.html.erb
    end
  end

  def show
  end

end
