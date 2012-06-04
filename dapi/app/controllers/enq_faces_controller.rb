
class EnqFacesController < ApplicationController
  # GET /enq_faces
  # GET /enq_faces.json
  def index
    @enq_faces = EnqFace.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @enq_faces }
    end
  end

  # GET /enq_faces/1
  # GET /enq_faces/1.json
  def show
    @enq_face = EnqFace.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @enq_face }
    end
  end

  # GET /enq_faces/new
  # GET /enq_faces/new.json
  def new
    @enq_face = EnqFace.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @enq_face }
    end
  end

  # GET /enq_faces/1/edit
  def edit
    @enq_face = EnqFace.find(params[:id])
  end

  # POST /enq_faces
  # POST /enq_faces.json
  def create
    @enq_face = EnqFace.new(params[:enq_face])

    respond_to do |format|
      if @enq_face.save
        format.html { redirect_to @enq_face, notice: 'Enq face was successfully created.' }
        format.json { render json: @enq_face, status: :created, location: @enq_face }
      else
        format.html { render action: "new" }
        format.json { render json: @enq_face.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /enq_faces/1
  # PUT /enq_faces/1.json
  def update
    @enq_face = EnqFace.find(params[:id])

    respond_to do |format|
      if @enq_face.update_attributes(params[:enq_face])
        format.html { redirect_to @enq_face, notice: 'Enq face was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @enq_face.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /enq_faces/1
  # DELETE /enq_faces/1.json
  def destroy
    @enq_face = EnqFace.find(params[:id])
    @enq_face.destroy

    respond_to do |format|
      format.html { redirect_to enq_faces_url }
      format.json { head :no_content }
    end
  end
end
