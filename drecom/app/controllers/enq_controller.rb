class EnqController < ApplicationController
  def get
  end

  def index
    @enqs = Enq.all

    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @enqs } # index.json.erb
    end
  end

  def show
  end

end
