# coding: utf-8

class EnqsController < ApplicationController
  # GET /enqs/1/getEnq
  # GET /enqs/1/getEnq.json
  def getEnq
	enq_face = params[:enq_face]
	message = "<p>友達にシェアしよう！</p>"
	
	begin
      #enq = Enq.find_by_uuid(params[:id]),
	  enq = Enq.find_by_id(params[:id],
							:include => :enq_faces,
							:conditions => ["enq_faces.face = ?", enq_face]
							)
	rescue
	
	else
	  render :json => [enq.to_json(:only => [:id,:movie,:thumbnail,:title,:description],
									:include => {:enq_faces => {:only => [:first_page_id,:wait_until,:css]}}
									),
						message.to_json]
	end
  end

  # GET /enqs
  # GET /enqs.json
  def index
    @enqs = Enq.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @enqs }
    end
  end

  # GET /enqs/1
  # GET /enqs/1.json
  def show
    @enq = Enq.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @enq }
    end
  end

  # GET /enqs/new
  # GET /enqs/new.json
  def new
    @enq = Enq.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @enq }
    end
  end

  # GET /enqs/1/edit
  def edit
    @enq = Enq.find(params[:id])
  end

  # POST /enqs
  # POST /enqs.json
  def create
    @enq = Enq.new(params[:enq])

    respond_to do |format|
      if @enq.save
        format.html { redirect_to @enq, notice: 'Enq was successfully created.' }
        format.json { render json: @enq, status: :created, location: @enq }
      else
        format.html { render action: "new" }
        format.json { render json: @enq.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /enqs/1
  # PUT /enqs/1.json
  def update
    @enq = Enq.find(params[:id])

    respond_to do |format|
      if @enq.update_attributes(params[:enq])
        format.html { redirect_to @enq, notice: 'Enq was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @enq.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /enqs/1
  # DELETE /enqs/1.json
  def destroy
    @enq = Enq.find(params[:id])
    @enq.destroy

    respond_to do |format|
      format.html { redirect_to enqs_url }
      format.json { head :no_content }
    end
  end
end
